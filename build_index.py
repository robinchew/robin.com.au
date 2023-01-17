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
            a, label {
                white-space: nowrap;
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
            <li>
                <img src="robin.com.au-my-photo.png" title="photo of me" />
            </li>
            <li>
                <img src="me-at-robin-com-au.png" />
            </li>
            <li>
                I recruit Software Developers and provide training too, so e-mail me.
            </li>
            <li>
                <a href="https://docs.google.com/document/d/1Gy45ACXyeNOT1AiA0fKXVSEUd133net_6asxgg29EPc/edit?usp=sharing">Resume</a>
            </li>
            <li>
                <a href="http://workshop.robin.com.au">Workshop</a>
            </li>
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
        </ul>

        %(testimonial_section)s

        <ul class="small" style="margin-top:60px">
            <li>
                <a href="http://pythonwa.com">Python WA</a>
            </li>
            <li>
                <a href="https://www.linkedin.com/pub/robin-chew/48/82a/44">Linkedin</a>
            </li>
            <li>
                <a href="https://www.facebook.com/robin.chew.750/">Facebook</a>
            </li>
            <li>
                <a href="http://obsi.com.au">OBSI PTY LTD</a> (closed)
            </li>
        </ul>
    ''' % {'testimonial_section': testimonial_section})

def render_testimonials():
    people = [
        (
            'Matt Harley',
            'Megatix',
            "I've known Robin to be a talented programmer and he has now translated his skills to train and recruit other talents for our dev team. Happy with his work!",
            'https://www.linkedin.com/in/mattharley/',
            'https://media.licdn.com/dms/image/C5603AQEK599HSEAQDA/profile-displayphoto-shrink_100_100/0/1631063160378?e=1679529600&v=beta&t=UJJ24JEyWflN9Zc1bl1DWCYoBy8wnFzBQv_F0r1VtqU'
        ),
        (
            'Andy Lam Yu',
            '',
            'Robin gave me an excellent opportunity to confirm my understanding of programming by providing feedback on areas I lacked while building some work experience.',
            'https://www.linkedin.com/in/andy-lam-yu-52820b160/',
            'https://media.licdn.com/dms/image/C5603AQGhwmf3yaJARA/profile-displayphoto-shrink_100_100/0/1638935450636?e=1679529600&v=beta&t=TXpfqG-5LDAcRZk1XkQwzq9F1QHAOKxW7v6bPQEI7Og',
        ),
        (
            'Jay Xie',
            '',
            "Robin is very knowledgeable and experienced in Python programming, and is very fun to work with. Robin taught me a lot of programming concepts I couldn't learn from college so he is also a good teacher.",
            'https://www.linkedin.com/in/jay-xie-11a732230/',
            None,
        ),
    ]
    return render_to_html(
        ('div',
        {
            'class': 'clearfix',
            'style': 'background:#eee;padding:10px;border:solid #ccc;border-width:1px 0',
        },
        ('h3', { 'style': 'margin:0' }, 'Testimonials'),
        *(
            ('div', { 'style': 'float:left;width:{}%'.format(100 / len(people)) },
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
                            ' (' + sub_name + ')' if sub_name else ''))))
            for i, (name, sub_name, testimonial, link, pic_link) in enumerate(people))))

def build_index():
    with open('index.html', 'w') as f:
        f.write(template(render_testimonials()))

if __name__ == '__main__':
    build_index()
