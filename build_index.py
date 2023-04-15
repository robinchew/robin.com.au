from textwrap import dedent

def el(tag, attrs, content):
    if tag == 'br':
        return f'<{tag} />'
    attrs_string = ' ' + (' '.join(f'{k}="{v}"' for k, v in attrs.items())) if attrs else ''
    return f'<{tag}{attrs_string}>{content}</{tag}>'

def render_to_html(hyper):
    if type(hyper) is tuple:
        tag, attrs, *rest = hyper
        return el(tag, attrs, ''.join(render_to_html(item) for item in rest))
    return hyper

'''
print(render_to_html(
    ('div', { 'class': 'testimonial' },
        'testim',
        ('a',
            { 'href': 'link' },
            ('img', {'src': 'pic_link'}),
            '- ', 'name'))))
'''

def template(testimonial_section):
    return dedent('''\
        <style>
            html {
                font-size: 30px;
            }
            body {
                margin: 0;
            }
            ul {
                list-style: square;
            }
            ul li {
                margin: 20px
            }
            .small {
                font-size: 0.7rem;
            }
            .testimonial {
                border: 1px solid #999;
                padding: 10px;
                background: white;
            }
            .clearfix:after {
                display: block;
                content: '';
                clear: both;
            }
        </style>

        <ul>
            <li style="display:flex;align-items:center">
                <img src="robin.com.au-my-photo.png" title="photo of me" />
                <a href="https://www.linkedin.com/pub/robin-chew/48/82a/44" style="display:inline-block;width:70px;height:70px;margin:0 40px">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" class="mercado-match" focusable="false" fill="rgb(10, 102, 194)
    ">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                </a>
                <a href="https://www.facebook.com/robin.chew.750/" style="text-decoration:auto;font-weight:bold;font-family:sans-serif;font-size:2em">f</a>
            </li>
            <li>
                <img src="me-at-robin-com-au.png" />
            </li>
            <li>
                I recruit Software Developers and provide training too, so e-mail me.
            </li>
            <li>
                <a style="padding:10px 20px;background:pink" href="https://docs.google.com/document/d/1Gy45ACXyeNOT1AiA0fKXVSEUd133net_6asxgg29EPc/edit?usp=sharing">Resume</a>
            </li>
            <li style="padding:10px 20px;background:#ffee99">
                <a  href="http://workshop.robin.com.au/chat/week1">Workshop</a> every Monday (except holidays) 6pm at <a href="https://goo.gl/maps/8tYcJj9xdGUjbU257">Hillview Hub</a>
                <a  href="http://www.robin.com.au/monday-workshop-main-image.jpg">
                    <img src="http://www.robin.com.au/monday-workshop-main-image.jpg" style="vertical-align:middle;margin-left:10px;height:70px" />
                </a>
            </li>
            <li>
                <a href="build_index.py">Python code</a> <span class="small">that generated this index page</span>
            </li>
        </ul>

        %(testimonial_section)s

        <ul style="margin-top:60px">
            <li>
                <a href="http://music.robin.com.au">Music</a>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Noun_project_-_Music_notes.svg" style="width:1em;vertical-align:top" />
                <span class="small">
                    Looking for a volunteer to programme using
                    <a href="https://numpy.org/doc/stable/reference/generated/numpy.fft.fft.html">fast fourier transform</a> to recognise musical notes.
                    <a href="files/2022-12-12 19.54.21.wav">Sample sound file WAV</a>
                    <a href="files/2022-12-12 19.53.49.ogg">Sample sound file OGG</a>
                </span>
            </li>
            <li>
                <a href="http://obsi.com.au">OBSI PTY LTD</a> (closed)
            </li>
        </ul>
    ''' % {'testimonial_section': testimonial_section})

def render_testimonials_container(content):
    return render_to_html((
        'div',
        {
            'class': 'clearfix',
            'style': 'background:#eee;padding:10px;margin-top:50px;border:solid #ccc;border-width:1px 0',
        },
        ('h3', { 'style': 'margin:0' }, 'Testimonials'),
        content))

def render_testimonials(people):
    return render_to_html(
        ('div',
        {},
        *(
            ('div', { 'style': 'float:left;margin-top:10px;width:{}%'.format(100 / len(people)) },
                ('div', { 'class': 'small testimonial', 'style': 'margin-left:10px;' if i > 0 else '' },
                    '"',
                    testimonial,
                    '"',
                    ('a',
                        {
                            'href': link,
                            'style': 'display:flex;justify-content:end',
                        },
                        ('img', {'src': pic_link, 'style': 'width:40px;height:40px;vertical-align:middle;margin-right:4px;' }) if pic_link else '',
                        ('div', { 'style': 'align-self:center' },
                            name,
                            ('span', {'style': 'font-size:0.8em'}, ' (' + sub_name + ')') if sub_name else ''))))
            for i, (name, sub_name, testimonial, link, pic_link) in enumerate(people))))

def build_index():
    with open('index.html', 'w') as f:
        f.write(template(render_testimonials_container(
            render_testimonials([
                (
                    'Matt Harley',
                    'Megatix',
                    "I've known Robin to be a talented programmer and he has now translated his skills to train and recruit other talents for our dev team. Happy with his work!",
                    'https://www.linkedin.com/in/mattharley/',
                    'https://media.licdn.com/dms/image/C5603AQEK599HSEAQDA/profile-displayphoto-shrink_200_200/0/1631063160378?e=1686787200&v=beta&t=3sOAMnyX1U4U9uuH0zVvAUCVM6l6bU7545Iw-NRh5Ns',
                ),
                (
                    'Andy Lam Yu',
                    'Murdoch Alumni',
                    'Robin gave me an excellent opportunity to confirm my understanding of programming by providing feedback on areas I lacked while building some work experience.',
                    'https://www.linkedin.com/in/andy-lam-yu-52820b160/',
                    'https://media.licdn.com/dms/image/C5603AQGhwmf3yaJARA/profile-displayphoto-shrink_200_200/0/1638935450636?e=1686787200&v=beta&t=tN6nSHhFz37OsyWiu5MPOeE0N1m96YkL1ELBHnqGukA',
                ),
                (
                    'Jay Xie',
                    'Murdoch Alumni',
                    "Robin is very knowledgeable and experienced in Python programming, and is very fun to work with. Robin taught me a lot of programming concepts I couldn't learn from college so he is also a good teacher.",
                    'https://www.linkedin.com/in/jay-xie-11a732230/',
                    None,
                ),
            ]) + \
            render_testimonials([
                    (
                        'Andrew Ho',
                        'Murdoch Alumni',
                        "Robin is a great and knowledgeable mentor in software development. His approach to mentoring allowed me to not only learn from him but grow independently and allow me to build up experience with practical projects as a software developer",
                        'https://www.linkedin.com/in/andrew-ho-sy/',
                        'https://media.licdn.com/dms/image/C5603AQE_rEinoZQfcA/profile-displayphoto-shrink_200_200/0/1602740931307?e=1684972800&v=beta&t=Eju0jV4cp3grl-n_4naDJX8vdEI-AR5T3L6dle1Zsf4'
                    ),
                    (
                        'Ryan Tarpey',
                        'Curtin Undergrad',
                        "Working with Robin was fantastic, and provided me with the opportunity to gain real-world, practical work experience. His guidance and feedback were very helpful in developing my programming skills past what is taught in university.",
                        'https://github.com/raan-kun',
                        'https://avatars.githubusercontent.com/u/11539931?v=4',
                    ),
                ]))))

if __name__ == '__main__':
    build_index()
