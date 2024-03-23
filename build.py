import os
import sh
import subprocess

from eluthia.defaults import control
from eluthia.decorators import file, chmod
from eluthia.functional import pipe
from eluthia.py_configs import deb822, nginx

def nginx_conf(full_path, package_name, apps):
    return (
        ('server', (
            ('listen', 80),
            ('server_name', 'robin.com.au', 'robin.au', 'www.robin.au'),
            ('return', 301, '$scheme://www.robin.com.au$request_uri'),
        )),
        ('server', (
            ('listen', 80),
            ('server_name', 'www.robin.com.au'),
            ('root', '/home/ubuntu/system/robin.com.au'),
            ('location', '/', (
                ('index', 'index.html'),
            )),
            ('location', '/files', (
                ('autoindex', 'on'),
            )),
        )),
    )

@file
def build_index(full_path, package_name, apps):
    app = apps[package_name]
    sh.python3('-m', 'venv', app['env']['VENV_BUILD_PATH'])
    pip = sh.Command(os.path.join(app['env']['VENV_BUILD_PATH'], 'bin/pip'))
    pip.install('pillow')

    python = sh.Command(os.path.join(app['env']['VENV_BUILD_PATH'], 'bin/python'))
    content = python(os.path.join(app['clean_git_folder'], 'build_index.py'))
    return content

@chmod(0o755)
@file
def postinst(full_path, package_name, apps):
    domains = ','.join(apps[package_name]['https_domains'])
    return f'''\
        #!/bin/bash
        set -x
        sudo certbot run -n --nginx --agree-tos -d {domains}
    '''

def get_package_tree(package_name, apps):
    return {
        'DEBIAN': {
            'postinst': postinst,
            'control': file(pipe(
                control,
                lambda d: {
                    **d,
                    'Version': apps[package_name]['version'],
                    'Description': 'Robin.com.au',

                    # No need this dependency, because we want to generate index.html
                    # and deploy this without deploying build_index.py
                    # 'Depends': 'python3-pil',
                    'Depends': 'python3-certbot-nginx',
                },
                deb822)),
        },
        'home': {
            'ubuntu': {
                'system': {
                    'robin.com.au': {
                        'index.html': build_index,
                    },
                },
            },
        },
        'etc': {
            'nginx': {
                'sites-enabled': {
                    package_name: file(pipe(
                        nginx_conf,
                        nginx)),
                },
            },
        },
    }
