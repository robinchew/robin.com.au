import base64
import io
import os
from textwrap import dedent
from PIL import Image, ImageColor

# Image generation

def hex_to_dec(hex_colour):
    return ImageColor.getcolor(hex_colour, "RGBA")

def create_tile():
    # code = b'iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAQAAAAEnG+bAAAAZklEQVQIHU3BsQnCAAAEwEewEAdwDolgoWApJIVY2SmoAWvXcAP3cAQ3sHcSOUmKJHdRpGMc53Ss42uWlol3FI5uNq4ulmlY+Tml55EhZYY801Phnoat2t5cqbaLj2laRl5xSMfiDz2iMrtJcYQcAAAAAElFTkSuQmCC'
    code = b'iVBORw0KGgoAAAANSUhEUgAAAGQAAACwCAQAAABTRAPmAAAG90lEQVR4AdXBfZDUBR3H8c/uHXvEAoccckgeD5GQKUxFORQqBMeURakzUH90aKWXGkRMhaBS54yjSJLA0IxiIJwlFYkPWNEdD43RIHeioyjBHGoHihjIgxyI3NO7+92y3D79dveOvd3f9/USIYNkGkeFo0HGUSMcB2QcVcKxW8bxlHDUyDhWC8dmGccy4dgg41goHJtkHMuEY4eM43Hh2C3j+ItwHJBx/EM4Tso4doiQgTKND0TINTKMASBCymUYV4MIWSzDuAVESLUMYymIkNMEZBavgQi7WkZRRAuIsF/JKL5DGxH2TxnFI7QRYU0MkkH4eZc2osNPZRBfp53osFMG8STtRKTRMobeNNBORFoiYyjnHBHpFBfLEPKo4xwR7T4ZQhnniWgn6Ccj8PE654lYC2QE04kgYp1mmAygF28TQcRbLwNYSBSRyDflcVzGx0QRibxJUB6Gn63EEImtlYdxN3GEm+/LoxhHI3GEm48YIw+iP/tJQLjbQ395DAE2k5BIpoagPAQflbgQyf2VfHkGD+NKpFKJX57AXSQhUnuansoxfFSQlEjHVvoqh8hjBSmI9OykWDlCL54jJZGu9ylVDjCK10iDSF8zFfiVVZTRQFrERK7lOqZTzhwW8Qx7acRdFYOVJfRlFe6aeYuNLOHn/IjvMlXxyGckN7GG/SRyigoC6nZM5QCJHGYddzCGAqWPEdzONlqJtZfJ6kZcRhXxdnEno/GpqyhhHnVEa+UZvqhuwKdZSSPRjrKC8coMStlOrG1MVgZxBZU0Ee0tZlOgzGI8G4hVw0yKdIEIUkYVLUTbxQzy1D0oZS+xzvIs0yhUF/AJvkYlDcQ6RBk+dSd6MJsG4jVTw0KmEFQaCDCeX7KVM8RroZIiZQPD2IKbVuqpZjkz+TaTGMtIBlPMCMYykamUs5jnqaMJN6/zBWUPPubRTOZVElS2MYGDZFIDZcoNiqklU+q5XLlDkI1kwm5KlFsEWMuF2sEA5R5+HuNCbKaXvAE/6+iql+gj7yBANV2xj2J5C4W8Sme9xzB5D0M5Smc0M0nexLdoJX13y7tYTrq2kCfvooBXScf/GChv40u0kNpN8j5+Ryrb8Mn76M9hkmlijGzgNpJ5WFbQg3rcnOES2cEs3CyXJfTkIIk0MlS2MJdEVssaijhLvHGyh+eIVYdP9jCNWAtkEQE+IFIrw2UTa4i0Q1ZxM5EekFWUEGmK7KKOsLMEZRePEvYvWcbthC2TZXyVsB/LMgYTNlm28SEhl8o2duI4jU+2UY3jHVnHehx7ZB1rcNTKOpbj2CLrWIjjeVnHUhzVso5VOF6UdazD8YasYyOOelnHdhwnZB2HCSmSZfQj7CuyjHGE/UCWcTNhD8oyHiLsb7KMlwg7Sb6soh/NdLhKVnEDkebLKpYRqUo24eNtIp2lSBYxgVi3ySJWEuvfsoeeHCfeSFlDGYncL1vwsYtETtBPlnAjbubLEmpxc4SgrOA6kpkjGwjwH5I5xkBZwF2kslreRwmnSKWVifI6niUduwjIy7iDdC2RdzGaj0hXKzfKm+jNHjrjOMPlPfh5is6qJSivYQldsYmAvIQFdNWT+OUV3EorXfcbeQOzaOHC/Ba/cgsfFWTC0/RU7pDPKjJlM32UGxSziUzayxhlH5M4RKadYbayiQAP0IK7Bl5mLYu4hzmUM53p/JCfMJ8HWcMOjpHMHyhUdjCBN0jkY16gglJKlAIXcy1z+TsNJHKIGfjUvbiESlqJdZDFlNJLnUQ+47mXOuK9wBXqLgzgfk4S7QzrmEq+LghjWcphojXyCMOVaQykgg+J9j530lcZQgG3sI9oLazjcmUGeUzhCc4QbT+z6aUMw89UdhKthQ1Mo0Bdh4/P8WveJdZJfkYPdRN8fI9DxDrGo1xDnjqHTzGDFbxDIhsYom5GIUtpJt4pNjGPsfgVC59EIZ9kFGO5nrmsZBtHcLOfKcoSPs8ruDlBLb/nHqZxFZ9lCBeJzthAf2URBSwlTSJdTVTgV9ZxA8dIg0jPYb6sHGEEe0lJpKOeUcoh+rOdFERqu7lUOUaQjSQlUqnlInkAAdaThEhuH8XyCAJU4Uokc5Bh8hD68DIuhLtjXCmPoZg3SUi4aeV6eRBXcpoEhJtF8ihuJQGRWA0BeRZPEEckcpwh8jB6U0cMkchMeRylxBDxdpInz+PPRBGxWhgnAxjECSKIWI/JCH5BBBGtkaEygp68x3ki2ioZwjzOE5GaGSlD6M0RzhGR/iRjuJdzRKSJMobBNNNOdKjHL3Oopp3ocJ8MYgbtRIfPyCCCnKSNCHtFRvFH2oiwh2QU5bQRYd+QUYygjQhpoq/M4r8gQl6UYTwOImS5DGMWiJBZMoxSECFTZBgl8H8kTCjBjXmbjAAAAABJRU5ErkJggg=='

    image = Image.open(io.BytesIO(base64.b64decode(code)))
    image.convert('RGBA')

    new_width = 8
    new_height = int((float(new_width) / image.size[0]) * image.size[1])
    return image.resize((new_width, new_height))

def create_roof():
    tile = create_tile()
    tile_width, tile_height = tile.size
    num_tiles = 6
    roof = Image.new('RGBA', (tile_width, tile_height * num_tiles))
    for i in range(num_tiles):
        roof.paste(tile, (0, i * tile_height))
    return roof

def create_gradient_top_down(size, colour_top, colour_bottom):
    gradient = Image.new('RGBA', size, color=(255, 255, 255, 0))
    width, height = size

    # Create a gradient from top to bottom
    for y in range(height):
        for x in range(width):
            r = int(colour_top[0] + (colour_bottom[0] - colour_top[0]) * y / height)
            g = int(colour_top[1] + (colour_bottom[1] - colour_top[1]) * y / height)
            b = int(colour_top[2] + (colour_bottom[2] - colour_top[2]) * y / height)
            a = int(colour_top[3] + (colour_bottom[3] - colour_top[3]) * y / height)
            gradient.putpixel((x, y), (r, g, b, a))
    return gradient

def save(image):
    image.save('image.png')

def layer(size, images):
    final_image = Image.new('RGBA', size, color=(255, 255, 255, 0))

    for image in images:
        #draw.rectangle((0, 0, image.width, image.height), fill=(255, 255, 255, 0))
        final_image = Image.alpha_composite(final_image, image)
    return final_image

def get_bytes(image, optimize=True):
    with io.BytesIO() as output:
        image.save(output, format='PNG', optimize=optimize)
        return output.getvalue()

def compress(image):
    width, height = image.size
    #png_data = image.tobytes()
    #print('png', png_data)
    #png_image = png.Writer(width=width, height=height, bitdepth=8)
    #png_bytes = png_image.write_array(png_data)

    # Compress the pyPNG image using pngquant
    #return pngquant.quantize(get_bytes(image))

# HTML

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

def custom_list(content_list):
    return el('ul', {'style': "padding:0;margin:100px 0;list-style:none"}, ''.join([
        el('li',
            {
                'style': 'display:flex;align-items:center;' + style,
            },
            '<span style="margin-right:20px;font-weight:bold;font-size:0.5em">&ndash;</span>' + item)
        for style, item in content_list
    ]))

'''
print(render_to_html(
    ('div', { 'class': 'testimonial' },
        'testim',
        ('a',
            { 'href': 'link' },
            ('img', {'src': 'pic_link'}),
            '- ', 'name'))))
'''

file_links = {
    'my_photo': 'robin.com.au-my-photo.png',
    'email_image': 'me-at-robin-com-au.png',
    'resume_pdf': 'resume-2025-05-06.pdf',
    'social_coding_image': 'monday-workshop-main-image.jpg',
    'computer_setup_photo': 'computer-setup-2025.jpg',
    'build_index_py': 'build_index.py',
}

for link in file_links.values():
    assert os.path.isfile(link)

def template(testimonial_section):
    roof = create_roof()
    top_tile = layer(roof.size, [
        create_gradient_top_down(roof.size, hex_to_dec('#eeeeee'), (255, 255, 255, 255)),
        roof,
    ])
    tile_image_code = base64.b64encode(get_bytes(top_tile)).decode()
    return dedent('''\
        <style>
            html {
                font-size: 30px;
            }
            body {
                background: url(data:image/png;base64,%(tile_image_code)s) repeat-x;
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
            .cover-bg {
                background-image: url(%(computer_setup)s);
                height: 400px;
                background-size: cover;
                background-position-y: 20%%;
            }
        </style>

        %(top_list)s
        %(computer_photo)s
        %(testimonial_section)s

        %(bottom_list)s
    ''' % {
        'computer_setup': 'computer-setup-2025.jpg',
        'tile_image_code': tile_image_code,
        'testimonial_section': testimonial_section,
        'computer_photo': render_to_html(('div', {'class': 'cover-bg'})),
        'top_list': custom_list([
            ('', f'''
            <img src="{file_links['my_photo']}" title="photo of me" />
            <a href="https://www.linkedin.com/in/robin-chew-04482a48/" style="display:inline-block;width:70px;height:70px;margin:0 40px">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" class="mercado-match" focusable="false" fill="rgb(10, 102, 194)
    ">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
            </a>
            <a href="https://www.facebook.com/robin.chew.750/" style="text-decoration:auto;font-weight:bold;font-family:sans-serif;font-size:2em">f</a>
            '''),
            ('', f'<span><img style="vertical-align:middle;margin-right:20px" src="{file_links['email_image']}" /><span class="small">I recruit Software Developers and provide training too, so e-mail me.</span></span>'),
            ('', f'<a style="padding:10px 20px;background:pink;border-radius:5px" href="{file_links['resume_pdf']}">Resume</a>'),
            ('', dedent(f'''\
            <span style="display:inline-block;padding:10px 20px;background:#ffee99;border-radius:5px">
                <a  href="http://workshop.robin.com.au/chat">Social Coding</a> every Thursday (except holidays) at 5pm - 7pm at <a href="https://goo.gl/maps/8tYcJj9xdGUjbU257">Hillview Hub</a>
                <a href="{file_links['social_coding_image']}">
                    <img src="{file_links['social_coding_image']}" style="vertical-align:middle;margin-left:10px;height:70px" />
                </a>
            </span>
            ''')),
            ('', '<span><a href="{}">Python Code</a> <span class="small">that generated this index page</span></span>'.format(file_links['build_index_py'])),
        ]),
        'bottom_list': custom_list([
            ('', '''<a href="http://music.robin.com.au">Music</a>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Noun_project_-_Music_notes.svg" style="width:1em;vertical-align:top" />
            <span class="small" style="margin-left:20px">
                Looking for a volunteer to programme using
                <a href="https://numpy.org/doc/stable/reference/generated/numpy.fft.fft.html">fast fourier transform</a> to recognise musical notes.
                <a href="files/2022-12-12 19.54.21.wav">Sample sound file WAV</a>
                <a href="files/2022-12-12 19.53.49.ogg">Sample sound file OGG</a>
            </span>
            '''),
            ('', '<span><a href="http://obsi.com.au">OBSI PTY LTD</a> (closed)</span>'),
        ])
    })

def render_testimonials_container(content):
    return render_to_html((
        'div',
        {
            'class': 'clearfix',
            'style': 'background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAA7CAAAAABjipRUAAAArklEQVQoz22ROQ7EIBDA5v+P9VwQNlH2KBhSoKWyZMAc0plDriz4vg2gCdq6Zw8B4nuDAJxR0NhhqZq8lj8bPokn+qd+66pn95h1/1yVGF6Q7LCU3ycIms2judyXAqSMqESyw/B1jJcChECkeboAdo5KdCtwdmil7HWAgIdZmIxDAVyaVcLZIZc65nO4gLmamwDasxKhBcYOXkpzfoGaqqnkvLKJayWUHWwpnwfSH4yGuj6Fkz9DAAAAAElFTkSuQmCC) #eee repeat-x;padding:10px;margin-top:50px;border:solid #ddd;border-width:1px 0',
        },
        ('h3', { 'style': 'font-family:monospace;font-weight:normal;margin:0' }, 'Testimonials'),
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
                    ('div',
                        {
                            'style': 'display:flex;justify-content:end;align-items:center',
                        },
                        ('a',
                            {
                                'href': link,
                            },
                            ('img', {'src': pic_link, 'style': 'width:40px;height:40px;vertical-align:middle;margin-right:4px;' }) if pic_link else ''),
                        ('a', { 'href': link, 'style': 'margin: 0 5px' }, name),
                        ('span', {'style': 'font-size:0.8em'}, ' (' + sub_name + ')') if sub_name else '')))
            for i, (name, sub_name, testimonial, link, pic_link) in enumerate(people))))

def build_index():
    content = template(render_testimonials_container(
        render_testimonials([
            (
                'Matt Harley',
                'Megatix',
                "I've known Robin to be a talented programmer and he has now translated his skills to train and recruit other talents for our dev team. Happy with his work!",
                'https://www.linkedin.com/in/mattharley/',
                None,
            ),
            (
                'Andy Lam Yu',
                'Murdoch Grad',
                'Robin gave me an excellent opportunity to confirm my understanding of programming by providing feedback on areas I lacked while building some work experience.',
                'https://www.linkedin.com/in/andy-lam-yu-52820b160/',
                None,
            ),
            (
                'Jay Xie',
                'Murdoch Grad',
                "Robin is very knowledgeable and experienced in Python programming, and is very fun to work with. Robin taught me a lot of programming concepts I couldn't learn from college so he is also a good teacher.",
                'https://www.linkedin.com/in/jay-xie-11a732230/',
                None,
            ),
        ]) + \
        render_testimonials([
                (
                    'Andrew Ho',
                    'Murdoch Grad',
                    "Robin is a great and knowledgeable mentor in software development. His approach to mentoring allowed me to not only learn from him but grow independently and allow me to build up experience with practical projects as a software developer",
                    'https://www.linkedin.com/in/andrew-ho-sy/',
                    None
                ),
                (
                    'Ryan Tarpey',
                    'Curtin Undergrad',
                    "Working with Robin was fantastic, and provided me with the opportunity to gain real-world, practical work experience. His guidance and feedback were very helpful in developing my programming skills past what is taught in university.",
                    'https://github.com/raan-kun',
                    'https://avatars.githubusercontent.com/u/11539931?v=4',
                ),
            ])))
    print(content)

if __name__ == '__main__':
    build_index()
