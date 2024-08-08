const ON_REQUEST = null;
const CONTRACT = 'contract';
const FULL_TIME = 'full-time';
const PART_TIME = 'part-time';

function labelWorkType(type) {
  return ({
    [FULL_TIME]: 'Full-Time',
    [PART_TIME]: 'Part-Time',
  })[type] || 'Invoiced';
}

function email(url) {
  return ['a', { href: 'mailto:' + url }, url];
}

function link(url) {
  return ['a', { href: url }, url];
}

function unnest(list){
  // https://github.com/selfrefactor/rambda/blob/master/src/unnest.js
  return list.reduce((acc, item) => {
    if (Array.isArray(item)){
      return [ ...acc, ...item ]
    }

    return [ ...acc, item ]
  }, [])
}

const references = [
  {
    date: 'July 2023 - June 2024',
    company: 'Orexplore Technologies',
    url: 'https://www.orexplore.com',
    description: [
      'Automate data processing for data scientists and geologists. Build web UI for rock scanners. For ',
      ['ul', [
        'Python/Prefect',
        'JavaScript/WebSocket/Mithril',
        'Oracle/APEX',
        'Buildah/Podman',
      ]],
    ],
    reference: {
      name: 'Thomas Drage',
      position: 'Engineering Manager',
      // contact: email('drage@iinet.net.au'),
      contact: link('https://www.linkedin.com/in/thomas-drage/'),
    },
  },
  {
    date: 'June 2022 - October 2023',
    company: 'Dinner Twist',
    url: 'https://www.dinnertwist.com.au/',
    description: [
        'Semi-automatic food picking system to reduce worker pack time and eliminate human errors for ',
        ['a',{href:'https://www.dinnertwist.com.au'},'https://www.dinnertwist.com.au'],
        ['ul', [
          'Erlang',
          'JavaScript/WebSocket/Mithril',
        ]],
    ],
  },
  // coffee
  {
    date: 'June 2022 - October 2022',
    company: 'International Salon Supplies',
    url: 'https://www.internationalsalonsupplies.com.au/',
    description: [
      'Assemble a software team to do e-commerce integration for a salon supply company.',
      ['ul', [
        'Python',
        'Wordpress/Woocommerce/PHP',
        'Erlang',
      ]],
    ],
  },
  {
    date: 'September 2021 - February 2022',
    company: 'Private Client',
    url: '', // null
    description: [
      'Assemble a software team to develop a platform for a startup that connects NDIS service providers and support workers.',
      ['ul', [
        'Python',
        'JavaScript',
        'PostgreSQL',
        'Dart/Flutter (iOS & Android)',
      ]],
    ],
  },
  {
    date: 'June 2021 - July 2021',
    company: 'Woodside',
    url: 'https://www.woodside.com',
    description: [
      'Software consulting for Woodside through a recruiter.',
      ['ul', [
        'Python',
        'Excel',
      ]],
    ],
  },
  {
    date: 'March 2021 - June 2021',
    company: 'nForm',
    url: 'https://nform.com.au/',
    description: [
        'Software development agency.',
        ['ul',[
          'Python',
          'JavaScript',
          'HTML',
          'PostgreSQL',
        ]]
    ],
  },
  {
    date: 'April 2021',
    company: 'Harlsan',
    url: 'https://www.harlsan.com.au/',
    description: [
      'Software consulting about Python + Tableau integration and staff training on Git.',
      ['ul', [
        'Python',
        'Git',
        'Tableau',
      ]],
    ],
  },
  {
    date: 'February 2020 - December 2020',
    company: 'Rio Tinto',
    url: 'https://www.riotinto.com/',
    description: [
      'Software development contract for Rio Tinto through a recruiter.'
      ['ul', [
        'Python/Flask/Django',
        'JavaScript',
        'PostgreSQL/SQLite',
        'Git',
        'Vagrant',
        'Jenkins',
        'Jira',
      ].map(s => s)]
    ],
    workType: FULL_TIME,
  },
  {
    date: '2019',
    company: 'All Rentals',
    url: 'https://allrentals.com.au/',
    description: 'Django application that lists properties for sale/rental.',
  },
  {
    date: '2019',
    company: 'Three Springs Technology',
    url: 'https://threespringstechnology.com/',
    description: [
      'Develop devops infrastructure for AI product for medical imaging.',
      ['ul', [
        'Python/Flask',
        'DICOM',
        'Docker',
      ].map(s => s)]
    ],
  },
  {
    date: '2019',
    company: 'TyreConnect',
    url: 'https://tyreconnect.com.au/',
    description: 'Elixir Development',
  },
  // nemo
  // scratch at montessory
  {
    date: '2019',
    company: 'UFO Star Station',
    url: 'https://maps.app.goo.gl/PeQjvwFxsC63wf1L9',
    description: [
      'Develop an offline KDS (Kitchen Display System) web application for displaying orders for restaurant kitchens pushed from Square POS.',
      ['ul', [
        'UI (Javascript/Mithril)',
        'API Server (Erlang/Cowboy)',
        'SQL (No ORM)',
        'Integration with EFTPOS terminals (C#, .NET Core)'
      ].map(s => s)],
    ],
  },
  {
    date: '2018',
    company: 'Spring Tech (now called CorePlan)',
    url: 'https://www.coreplan.io/',
    description: [
      'Design and build web applications to analyse and visualise data of mining operations.',
      ['ul', [
        'Python/Django',
        'JavaScript/Mithril',
        'MSSQL',
      ].map(s => s)]
    ],
    reference: {
      name: 'Alex Goulios',
      position: 'Director',
      contact: '+61 8 6365 4488',
    },
    workType: PART_TIME,
  },
  {
    date: '2017',
    company: 'Teacher Search',
    url: '', // null
    description: [
      'A short-lived startup that connects schools and relief teachers.',
      ['ul', [
        'Web Frontend: JavaScript',
        'iOS: Swift',
        'Android: Kotlin',
        'Backend: Python'
      ].map(s => s)],
    ],
  },
  {
    date: '2016',
    company: 'Ciao Bella Nail Salon',
    url: 'https://www.facebook.com/SNSnailsCanningVale/', // null
    description: [
      `This beauty salon has 2 branches and staff are expected to move between those branches with clients who are willing to move between branches to access the service in high demand. The business owner uses OBSI's web application with a timetable interface in order to create and occasionally move client/staff bookings between branches in order to satisfy demand.`,
      ['ul', [
        'API Server (Python/Django)',
        'UI (Clojurescript/Reagent, Javascript/React)',
        'Custom CI server (Go)',
        'Amazon Web Services',
      ].map(s => s)],
    ],
  },
  {
    date: '2015',
    company: 'Lightcube Designs',
    url: 'https://bia.lighting/', // null
    description: [
      'A custom quoting system with floor plan drawing integration saves the business owner time to create both quotes and floor plans simultaneously on the same web application with guaranteed synchronised quote data that matches the drawings. This saves the headache of using 2 separate applications for quoting and floor plan design, and manually keeping them in sync for every client with ever-changing requirements.',
      ['ul', [
        'API Server (Python/Django)',
        'UI (Javascript/jQuery/Canvas)',
        'Amazon Web Services',
      ].map(s => s)],
    ],
  },
  {
    date: '2016',
    company: 'SignIQ (now called Last Yard)',
    url: 'https://www.signiq.com',
    position: 'Senior Software Developer',
    description: "SignIQ is a leading Retail Ticketing company with customers across Australia and New Zealand. Senior Software Developer responsible for developing web applications in Python, Django, JavaScript and React.",
    reference: {
      name: 'Chris Stoyles',
      position: 'CTO',
      contact: '6230 2475',
    },
    workType: FULL_TIME,
  },
  {
    date: '2012 - 2013',
    company: 'Harmonic New Media',
    url: 'http://harmonic.com.au/',
    position: 'Senior Software Developer',
    description: "A Perth based New Media company, responsible for building sports-tipping and e-commerce web applications used in large scale by large clients.",
    reference: {
      name: 'Craig Harman',
      position: 'Director',
      contact: '9227 0003',
    },
    workType: FULL_TIME,
  }
];

const expDesciption = [
    "I've been programming for more than 10 years professionally, developing mostly in Erlang,  Python and JavaScript. I've been heavily influenced by functional programming languages such as Clojure. Whichever programming language I use nowadays, I write more \"value-oriented\" (as described by Rich Hickey ",
    ['a',{href:'https://youtu.be/-6BsiVyC1kM'},'https://youtu.be/-6BsiVyC1kM'],
    ") with immutable data and composable functions, rather than object-oriented code."
];

const frontendStacks = [
    ['Javascript + ', ['a', { href: 'https://mithril.js.org' }, 'Mithril'], '/React'],
];

const backendStacks = [
    'Python + Flask/Django',
    'Erlang + Cowboy',
    'Clojure',
    'ClojureScript'
];
const familiarStacks = [
    'Elixir + Phoenix',
    'Kotlin',
    'Swift',
    'Dart + Flutter'
];
const lessFamiliar = [
    'C#/.NET Core',
    'Java',
    'Go'
];

const skills = [
    'Arch Linux, Ubuntu, Debian, Red Hat, Slackware',
    'Vim, Android Studio, Xcode',
    'PostgreSQL, MySQL, MSSQL, SQLite',
    'Git, Github, Gitlab, Bitbucket',
    'Bash Scripting',
    'HTML/CSS',
    'Photoshop',
    'Docker, LXC, Buildah, VirtualBox/Vagrant, VMWare',
    'AWS services: EC2, S3, Lambda, DynamoDB, Elastic Beanstalk, etc.',
];

const talks = [
    {
        title: 'Teaching Python and Javascript to aspiring developers',
        list: [
            [
              ['a',{href:'https://www.canning.wa.gov.au/events/social-coding/'}, 'Social Coding'],
              ' every week at Hillview Intercultural Community Centre',
            ],
            ['a',{href:'https://www.meetup.com/pythonwa/events/290315903/'},'https://www.meetup.com/pythonwa/events/290315903/']
        ]
    },
    {
        title: [
            'Co-organiser of the monthly Python meetup (2016-2022) ',
            ['a',{href:'http://pythonwa.com'},'http://pythonwa.com']
        ],
        list: [{
            title: 'Talked about how not to use Django',
            list: [
                ['a',{href:'https://www.meetup.com/Perth-Django-Users-Group/events/237759934/'},'https://www.meetup.com/Perth-Django-Users-Group/events/237759934/']
            ]
        }, {
            title: [
                'Introduce Single Page Applications using ',
                ['a',{href:'https://mithril.js.org'},'Mithril'],
                ' instead of React.'
            ],
            list: [
                ['a',{href:'https://www.meetup.com/Perth-Django-Users-Group/events/241878300/'},'https://www.meetup.com/Perth-Django-Users-Group/events/241878300/'],
                ['a',{href:'https://www.meetup.com/Perth-Django-Users-Group/events/240861484/'},'https://www.meetup.com/Perth-Django-Users-Group/events/240861484/']
            ]
        }]
    },
    {
        title: [
            'As guest programming workshop presenter for Perth Machine Learning Group ',
            ['a',{href:'https://www.pmlg.org/'},'pmlg.org']
        ],
        list: [{
            title: 'Kick out Meetup spam bots automatically with Python',
            list: [
                ['a',{href:'https://www.meetup.com/Perth-Machine-Learning-Group/events/kppfhryzpbsb/'},'https://www.meetup.com/Perth-Machine-Learning-Group/events/kppfhryzpbsb/']
            ]
        }]
    }
];

const contract2023 = [
    'Continued work for Dinner Twist to analyse packing data.',
    ['Automate data processing for data scientists and geologists. Build web UI for rock scanners. For ', ['a', { href: 'https://www.orexplore.com/' }, 'Orexplore'], '. (Python/Prefect, JS/Mithril/WebSocket, Oracle/APEX, Buildah/Podman)'],
];

const contract2022 = [
    'Got sick of programming and became a barista to run a cafe for a month. I don\'t even drink coffee.',
    'Assemble a software team to do e-commerce integration for a salon supply company. (Python, Wordpress/Woocommerce/PHP, Erlang)',
    'Social chat programme (Python, Erlang, JavaScript/WebSocket, PostgreSQL)',
    [
        'Semi-automatic food picking system to reduce worker pack time and eliminate human errors for ',
        ['a',{href:'https://www.dinnertwist.com.au'},'https://www.dinnertwist.com.au'],
        ' (Erlang, JavaScript/WebSocket)'
    ]
];

const quotedWork2021 = [
    'Assemble a software team to develop a platform for a startup that connects NDIS service providers and support workers. (Python, JavaScript, PostgreSQL, Dart + Flutter)'
];

const partTime2021 = [
    'Software consulting for Woodside through a recruiter. (Python)',
    [
        'Software development for NFORM ',
        ['a',{href:'https://nform.com.au/'},'https://nform.com.au/'],
        ' (Python, JavaScript, HTML)'
    ],
    [
        'Software consulting and staff training for Harlsan ',
        ['a',{href:'https://www.harlsan.com.au/'},'https://www.harlsan.com.au/'],
        ' (Git, Python, Tableau integration)'
    ]
];

const contract2020 = [
    'Full-time Software development contract for Rio Tinto through a recruiter. (Python, JavaScript, Vagrant, Jenkins, ...)'
];

const contract2019 = [
    'Django development for a property rental and sales site',
    [
        'Python development and devops (Docker) for ',
        ['a',{href:'https://threespringstechnology.com'},'https://threespringstechnology.com'],
        ' that uses AI for medical imaging'
    ],
    [
        'Elixir development for ',
        ['a',{href:'https://tyreconnect.com.au'},'https://tyreconnect.com.au']
    ],
    'Sub-contracted Kotlin development for sailing-related mobile app',
    'After hours assistant teaching Scratch for ICTLabs in Riverlands Montessori School'
];

const contract2018 = [
   ['Did a short contract work with ', ['a', { href: 'https://megatix.com.au' }, 'Megatix'], '. (Laravel, Vue)'],
];

const obsiProjDesc = [
    "OBSI is a software consultancy company that I've started, and below are the list of projects that I've completed for clients. See some screenshots at ",
    ['a',{href:'http://obsi.com.au'}, 'http://obsi.com.au'],
    " or else I am able to demonstrate these applications on request."
];

const obsiProject2019 = {
    projName: 'POS/KDS (Point of Sale/Kitchen Display System)',
    desc: 'Offline web application for displaying orders for restaurant kitchens pushed from POS.',
    techStack: [
        'UI (Javascript/Mithril)',
        'API Server (Erlang/Cowboy)',
        'SQL (No ORM)',
        'Integration with EFTPOS terminals (C#, .NET Core)'
    ]
};

const obsiProject2017 = {
    projName: 'Teacher Search',
    desc: 'A short-lived startup that connects schools and relief teachers.',
    techStack: [
        'Web Frontend: JavaScript',
        'iOS: Swift',
        'Android: Kotlin',
        'Backend: Python'
    ]
};

const obsiProject2016 = {
    projName: 'Ciao Bella Nail Salon',
    owner: 'Alfred Filser (0401662042)',
    desc: "This beauty salon has 2 branches and staff are expected to move between those branches with clients who are willing to move between branches to access the service in high demand. The business owner uses OBSI's web application with a timetable interface in order to create and occasionally move client/staff bookings between branches in order to satisfy demand.",
    techStack: [
        'API Server (Python/Django)',
        'UI (Clojurescript/Reagent, Javascript/React)',
        'Custom CI server (Go)',
        'Amazon Web Services'
    ]
};

const obsiProject2015 = {
    projName: 'Lightcube Designs',
    owner: 'Daniel Lee (0430537003)',
    desc: "A custom quoting system with floor plan drawing integration saves the business owner time to create both quotes and floor plans simultaneously on the same web application with guaranteed synchronised quote data that matches the drawings. This saves the headache of using 2 separate applications for quoting and floor plan design, and manually keeping them in sync for every client with ever-changing requirements.",
    techStack: [
        'API Server (Python/Django)',
        'UI (Javascript/jQuery/Canvas)',
        'Amazon Web Services'
    ]
};

const employment2018 = {
    endDate: '', // null
    companyName: 'Spring Tech (now called CorePlan)',
    url: 'https://springtech.io',
    position: 'Senior Software Developer',
    reference: 'Alex Goulios (Director)',
    desc: "Design and build web applications with Python and JavaScript/Mithril to analyse and visualise data of mining operations stored in MSSQL database."
};

const employment2014 = {
    endDate: '2016',
    companyName: 'SignIQ (now called Last Yard)',
    url: 'https://www.signiq.com',
    position: 'Senior Software Developer',
    reference: 'Chris Stoyles (CTO) (6230 2475)',
    desc: "SignIQ is a leading Retail Ticketing company with customers across Australia and New Zealand. Senior Software Developer responsible for developing web applications in Python, Django, JavaScript and React."
};

const employment2012 = {
    endDate: '2013',
    companyName: 'Harmonic New Media',
    url: 'http://harmonic.com.au',
    position: 'Senior Software Developer',
    reference: 'Craig Harman (Director) (9227 0003)',
    desc: "A Perth based New Media company, responsible for building sports-tipping and e-commerce web applications used in large scale by large clients."
};

const resume = [
    ['style', `
      ul {
        margin-top: 8px;
      }
    `],
    ['h1', 'Robin Chew'],
    ['div', 'Software Engineer'],
    ['div', 'Perth'],
    ['a',{href: 'mailto: me@robin.com.au'},'me@robin.com.au'],
    ['div', 'Australian Citizen'],
    ['p', ['Find my most up-to-date resume at ', ['a', { href: 'http://robin.com.au' }, 'robin.com.au']]],
    ['h2', 'Experience'],
    ['div', expDesciption],
    ['h2', 'Technology Stack'],
    ['h3', 'Frontend'],
    ['ul', frontendStacks],
    ['h3', 'Backend'],
    ['ul', backendStacks],
    ['h3', 'Familiar Languages'],
    ['ul', familiarStacks],
    ['h3', 'Less familiar but can get work done'],
    ['ul', lessFamiliar],
    ['h2', 'General Skills'],
    ['ul', skills],
    ['h2', 'Talks/Workshops'],
    ['ul', talks],
    ['h2', 'Work as Senior Software Engineer'],
].concat(unnest(references.map(({ date, company, url, description, workType }) => [
  ['h3', { style: { 'margin-bottom': 0 } }, [company, ['span', { style: { 'margin-left': '4px', 'font-size': '0.8em' } }, `(${labelWorkType(workType)})`]]],
  ['div', { style: { 'margin-left': '10px' } }, [['a', { href: url }, url]]],
  ['b', { style: { 'margin-left': '10px' } }, date],
  ['div', { style: { 'margin-left': '10px' } }, description],
])))
.concat([
  ['h2', 'References'],
])
.concat(unnest(references.filter(({ reference }) => reference).map(({ company, reference: { name, position, contact } }) => [
  ['h3', { style: { 'margin-bottom': '5px' } }, company],
  ['b', `Reference: ${name}`],
  ['div', `Position: ${position}`],
  ['div', ['Contact: ', contact]],
])));
