// Add photo of home setup
// Add hobbies

function logk(k, v) {
  console.log(k, v);
  return v;
}

const ON_REQUEST = null;
const CONTRACT = 'contract';
const FULL_TIME = 'full-time';
const PART_TIME = 'part-time';

function labelContact(contact) {
  if (contact === ON_REQUEST) {
    return 'Number given on request';
  }
  return contact;
}

function labelWorkType(type) {
  return ({
    [FULL_TIME]: 'Full-Time',
    [PART_TIME]: 'Part-Time',
  })[type] || 'Contract';
}

function email(url) {
  return ['a', { href: 'mailto:' + url }, url];
}

function link(url) {
  return ['a', { href: url }, url];
}

function vdomList(arr) {
  return ['ul', arr.map(i => ['li', i])];
}
function vdomTable(arr, opts = {}) {
  return ['table',
    {
      style: {
        'border-collapse': 'collapse',
      },
    },
    arr.map(row => ['tr', row.map((cell, i) =>
      ['td',
        {
          style: {
            'border': '1px solid grey',
            padding: '5px',
            ...(((opts.cols || [])[i] || {}).style || {})
          }, 
        }, 
        cell])])];
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

const supportReferences = [
  {
    date: '15, 17 October 2025',
    company: 'Ark Home Care',
    description: [
      'Did 2 days of buddy shift, assisting with the care of a client with ', ['b', 'autism'], ' and is non-verbal. I built a relationship with the client and follow strict documented routines per the request of the family. Some tasks I assisted includes food preparation, monitoring shower routine and everyday activities, and taking them out into community and being properly equipped (eg. water, hat, shoes, wheelchair, portable urinal, etc.)',
    ],
    references: [
      {
        name: 'Joan Le Roux',
        position: 'Director',
        contact: ['08 63882842'],
      },
    ],
  },
  {
    date: '22 September 2025 - 10 October 2025',
    company: 'Regis Como',
    description: [
      'Did 3 weeks placement at an aged care facility providing variety of support to predominantly residents with ', ['b', 'dementia'], ', including ADL, lifestyles and IT. I\'ve built the confidence in responding to resident\'s needs such as bed to chair/shower mobility transfers and toiletry/shower needs. Likewise, residents have built confidence in my ability to provide care for them. I also had the pleasure to work with supervising nurses who are happy to ', ['b', 'endorse'], ' me for my time there, please see references below.',
    ],
    references: [
      {
        name: 'G\'Nay Panpone',
        position: 'Registered Nurse',
        contact: [email('gpanpone@yahoo.com'), ' 040 247 6155'],
        // phone: '0402476155',
        // contact: link('https://www.linkedin.com/in/thomas-drage/'),
      },
      {
        name: 'Rael Kemei',
        position: 'Registered Nurse',
        contact: '042 224 9344',
      },
    ],
  },
];

function formatDescription({ date, company, url, description }) {
  return [
    ['h3', { style: { 'margin-bottom': 0 } }, [company, ['span', { style: { 'margin-left': '4px', 'font-size': '0.8em' } }]]],
    ['div', { style: { 'margin-left': '10px' } }, [['a', { href: url }, url]]],
    ['div', { style: { 'font-weight': 'bold', 'padding': '10px' } }, date],
    ['div', { style: { 'margin-left': '10px' } }, description],
  ];
}

function formatReferences({ company, references }) {
  return references.reduce((acc, { name, position, contact }) => [
    ...acc,
    ['div',
      {
        style: {
          'margin-bottom': '10px',
        },
      },
      ['b', `Reference: ${name}`],
      ['div', `Position: ${position}`],
      ['div', ['Contact: ', labelContact(contact)]],
      company ? ['div', 'Company: ' + company] : ''],
  ], []);
}

const references = [
  {
    date: 'July 2023 - June 2024',
    company: 'Orexplore Technologies',
    url: 'https://www.orexplore.com',
    description: [
      'Automate data processing (ETL) for data scientists and geologists. Build web UI for loading data into X-ray rock scanners. Last thing the X-ray machine were used for detecting gold from drill holes.',
    ],
    reference: {
      name: 'Thomas Drage',
      position: 'Engineering Manager',
      email: email('drage@iinet.net.au'),
      phone: '0409 916 925',
      contact: link('https://www.linkedin.com/in/thomas-drage/'),
    },
  },
  {
    date: 'June 2022 - October 2023',
    company: 'Dinner Twist',
    url: 'https://www.dinnertwist.com.au/',
    description: [
        'Built a semi-automatic food picking system consisting of about 20 tablets that direct workers to pack food items in a timely manner and eliminate human errors.',
    ],
    reference: {
      name: 'Chris Tistrand',
      position: 'Director',
      contact: '+61 8 6102 2727',
    },
  },
  {
    date: 'March 2022',
    company: 'Coffee Bar',
    // url: 'https://www.internationalsalonsupplies.com.au/',
    description: [
      'Worked as a barista, grinding coffee beans and steaming milk to serve quality coffee in a Burswood warehouse.',
    ],
  },
  {
    date: 'September 2021 - February 2022',
    company: 'Private Client',
    url: '', // null
    description: [
      'Assembled a software team to develop a platform for a startup that connects NDIS service providers and support workers.',
    ],
  },
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
].map(s => ['li', s]);
const familiarStacks = [
    'Elixir + Phoenix',
    'Kotlin',
    'Swift',
    'Dart + Flutter',
    'PHP + Laravel',
].map(s => ['li', s]);
const lessFamiliar = [
    'C#/.NET Core',
    'Java',
    'Go'
].map(s => ['li', s]);

const talks = [
    {
        list: vdomList([
          [['a',{href:'https://www.canning.wa.gov.au/events/social-coding/'}, 'Social Coding'], ' every week at Hillview Intercultural Community Centre'],
          [['a',{href:'https://www.meetup.com/pythonwa/events/290315903/'},'https://www.meetup.com/pythonwa/events/290315903/'], ' Python Programming'],
        ])
    },
].map(({ title, list }) => list);

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
    ['h1', { style: { 'font-size': '2em' } }, 'Ruoh Pin (Robin) Chew'],
    ['a',{href: 'mailto: me@robin.com.au'},'me@robin.com.au'],
    ['div', 'Australian Citizen'],
    ['h1', 'Support Worker/Carer'],
    ['p', 'I am typically calm, patient, good listener and can handle dynamic situations. I take my time to problem solve in order to provide the best care for the clients as well doing the job safely. Whatever challenge that you would like to propose to me, I am willing to listen.'],
    ['p', 'I am currently in ', ['b', 'South Perth'], ' but able to drive.'],
    ['h2', 'Certifications'],
    vdomTable([
      ['USI', '7U6W2KEQML'],
      ['Certificate III in Individual Support CHC33021', 'Completed on 10 October 2025'],
      ['HLTAID011 Provide First Aid', 'Completed on 24 April 2025'],
      ['NDIS Worker Screening Check ', [['b', { style: 'color:red' }, 'Expires'], ' on 29 June 2030']],
      ['Police Clearance ', ['Valid from 23 April 2025']],
      ['Working With Children Check',  [['b', { style: 'color:red' }, 'Expires'], ' on 17 June 2028']],
      ['Last COVID Immunisation', '02 January 2022'],
      ['Last Influenza Immunisation', '01 September 2025'],
      ['Car Ownership/Licence', 'Yes'],
      // ['Medcomp', ''],
      // ['Food', ''],
    ], { cols: [null, {style: { 'text-align': 'right' }}] }),
    ['h2', 'Skills'],
    vdomTable([
      ['English Competency', 'Proficient'],
      ['Mandarin Competency', 'Basic'],
      ['Mobility equipment', 'Hoist, Sara Stedy/Flex, wheelchair, walker.'],
      ['ADL', 'Bed wash, shower, trolley shower, toiletry, bed-making, shaving.'],
      ['Hygiene', 'Habitual hand washing, glove changing, urinal sterilisation.'],
      ['Feeding', 'Fed several residents with non-modified food.'],
      ['IT support', 'I am also a software engineer.'],
      ['Teaching', ['I occasionally teach programming to a client living at a SIL']],
    ]),
    ['h2', 'Experience'],
    supportReferences.map(formatDescription),
    ['p', ''],
    ['h2', 'Studies'],
    formatDescription({
      date: 'June 2025 - October 2025',
      company: 'Certificate III in Individual Support CHC33021 (Sero Institute)',
      description: ['Although this course is almost impossible to fail, I do the written assessments seriously, honestly and with integrity, despite the temptation of using AI. I went ', ['b', 'above and beyond'], ' with my studies, and I plan to maintain the same level of standard for my professional working life.']
    }),
    ['h2', 'Volunteer Teaching'],
    ['p', 'Teach coding to aspiring developers/programmers.'],
    talks,
    ['h2', 'References'],
    supportReferences.map(formatReferences),
    // ['div', { style: { 'break-after': 'page' } }],
    ['p',
      ['Find my software engineering resume at ', ['a', { href: 'http://robin.com.au' }, 'robin.com.au'], ' for your curiosity.'],
    ],
];

/**
 * Takes in a list of elements and returns a list of virtual of DOM Elemnts
 */
function ConvertListToDOM(listOfElements) {
    var ListOfDOM = [];

    for(var i = 0; i < listOfElements.length; i++)
    {
        // Check if there is a nested/sub list by checking for an object instead of an array
        if(typeof(listOfElements[i]) === 'object' && !Array.isArray(listOfElements[i])) {
            if(Array.isArray(listOfElements[i].title)) {
                listOfElements[i].title.push(['ul', listOfElements[i].list]);
                ListOfDOM.push(ConvertToHTML(['li', listOfElements[i].title]));
            } else {
                ListOfDOM.push(ConvertToHTML(['li', [listOfElements[i].title, ['ul', listOfElements[i].list]]]));
            }
        // Checks if there is a Hyperlink as a item in the list
        } else if(listOfElements[i][0] === 'a') {
            ListOfDOM.push(ConvertToHTML(['li', ConvertToHTML(listOfElements[i])]));
        } else {
            ListOfDOM.push(ConvertToHTML(['li', listOfElements[i]]));
        }
    }

    return m('ul', ListOfDOM);
}

function ConvertToHTML(element) {
    var domElement = m('div', element);

    if(Array.isArray(element)) {
        if(element.length == 2) {
            if(element[0] === 'ul') {
                domElement = ConvertListToDOM(element[1]);
            } else {
                if(Array.isArray(element[1])) {
                    domElement = m(element[0], element[1].map((element) => typeof(element) === 'object' ? ConvertToHTML(element) : element));
                } else {
                    domElement = m(element[0], element[1]);
                }
            }
        } else {
            if(Array.isArray(element[2])){
                domElement = m(element[0], element[1], element[2].map((element) => typeof(element) === 'object' ? ConvertToHTML(element) : element));
            } else {
                domElement = m(element[0], element[1], element[2]);
            }
        }
    }

    return domElement;
}

const TAGS = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];
function isObject(val) {
  return !!val && typeof val === "object" && val.constructor === Object;
}
function isTag(val) {
  return Array.isArray(val) && TAGS.includes(val[0]);
}
function processContent(content) {
  if (content === null || content === undefined) {
    return null;
  }
  if (isTag(content)) {
    return toVdom(content);
  }
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content.map(processContent);
  }
  console.error(content);
  throw Error(`${content} is not processed`);
}
function toVdom(v) {
  const v2 = isTag(v) ? v : ['div', ...v];
  const expanded = isObject(v2[1]) ? v2 : [v2[0], {}, ...v2.slice(1)];
  const contentList = expanded.slice(2);
  return m(expanded[0], expanded[1], contentList.map(processContent));
}
