import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Github, Linkedin, Mail, ExternalLink, Terminal, Cpu, Cloud, Database, Network, Bot, GraduationCap, Award, ChevronRight, Copy, Check, Menu, X} from 'lucide-react';
import './styles.css';

const profile = {
  name:'Ashwini Agarwal', role:'Principal Software Engineer', location:'Bengaluru, India', email:'ashwini.agarwal@protonmail.com',
  linkedin:'https://www.linkedin.com/in/ashwini-agarwal1311/', github:'https://github.com/ashwaniagarwal226', years:'12+ years',
  summary:'Principal Engineer with 12+ years of experience building large-scale distributed systems, cloud-native platforms, and observability infrastructure. Core expertise in Java, Spring Boot, Microservices, Kubernetes, AWS, Event-Driven Architecture, OpenTelemetry, Prometheus, and Thanos.',
  headline:'Architecting reliable systems at scale — and using AI to make engineers faster.'
};

const skills = {
  'Languages':['Java 8–22','SQL','PL/SQL','JavaScript','Python'],
  'Backend':['Spring Boot','Spring Framework','Spring Batch','Spring Security','Hibernate/JPA','Microservices','REST APIs','Event-Driven Architecture'],
  'Cloud':['AWS Lambda','API Gateway','EventBridge','SQS','RDS','IAM','CloudWatch','EKS','EC2','S3','Azure'],
  'Platform':['Kubernetes','Amazon EKS','Docker','Helm','Terraform','GitLab CI/CD','Maven','Gradle'],
  'Observability':['OpenTelemetry','Prometheus','Thanos','Splunk SignalFx','Grafana','CloudProber','Catchpoint','SLI/SLO'],
  'AI & Productivity':['Generative AI','LLMs','GitHub Copilot','AWS Kiro','MCP','AI Agents','Prompt Engineering','Specification-Driven Development'],
  'Data':['Oracle','PostgreSQL','MySQL','Amazon Aurora','H2','DynamoDB'],
  'Frontend & Quality':['React','Vue.js','HTML5','CSS3','jQuery','JUnit','Mockito','SonarQube'],
  'Tools':['Git','GitHub','GitLab','Jira','IntelliJ IDEA','VS Code','Eclipse','Postman']
};

const experience = [
 {period:'Sep 2021 — Present', company:'HERE Technologies', role:'Principal Software Engineer', location:'Bengaluru', color:'current', bullets:[
  'Architected and led stabilization and optimization of a multi-cluster Prometheus + Thanos observability platform, improving reliability while reducing compute utilization and operational cost across clusters.',
  'Architected a multi-cluster observability analytics tool integrated with OpsGenie and Jira to analyze recurring alerts and pinpoint cluster-specific incidents.',
  'Defined AI-driven development workflows using AWS Kiro and GitHub Copilot with specification-driven development.',
  'Architected an autonomous AI coding agent integrating GitLab and Jira MCP to analyze Jira tickets, execute low-risk changes/refactoring and create Merge Requests.',
  'Led observability migration from Prometheus & Grafana to OpenTelemetry and Splunk SignalFx.',
  'Architected a GenAI Incident Management Assistant using LLM-based automation for incident prioritization, classification and response recommendations; won 1st place in the organizational hackathon.',
  'Designed and developed a CLI for the endpoint tester tool.'
 ]},
 {period:'Sep 2021 — Apr 2024', company:'HERE Technologies', role:'Lead Software Engineer', location:'Bengaluru', bullets:[
  'Architected next-generation Metrics-as-Code observability platform replacing the legacy Wotan SLI/SLO solution.',
  'Led a scalable unified monitoring platform consolidating monitoring integrations through Spring Batch pipelines.',
  'Defined an event-driven observability platform using AWS Lambda, SQS, EventBridge, API Gateway and Spring Batch for unified application health visibility.'
 ]},
 {period:'Dec 2016 — Sep 2021', company:'JPMorgan Chase', role:'Associate — Java Developer / Software Engineer', location:'Mumbai', bullets:[
  'Built React SPA/mobile-web UI, Spring Boot REST APIs, microservices and Spring Batch workloads.',
  'Worked on cloud infrastructure design and implementation, critical production fixes, MVC components and Hibernate/Spring data layers.',
  'Automated build and deployment with Jenkins Pipeline and internal deployment tooling.',
  'Contributed to on-prem/cloud migration using Cloud Foundry and built a utility that surfaced Sonar code coverage/errors/failures with last-committer details.',
  'PaymentNet4: worked on monolith-to-microservices + cloud migration, infrastructure, production support, Core Spring/REST enhancements and client-facing requirements.'
 ]},
 {period:'Feb 2016 — Dec 2016', company:'Deloitte Consulting', role:'Business Technology Analyst', location:'Mumbai', bullets:['Developed enhancements, fixed production bugs and designed new functionality; received a 2016 award for enhancement design and development.']},
 {period:'Dec 2014 — Feb 2016', company:'Capgemini India', role:'Software Engineer', location:'Mumbai', bullets:['Gathered requirements, created design documentation, developed BIRT reports, integrated Jenkins CI, and developed mobile applications using AngularJS and REST web services.']},
 {period:'Sep 2013 — Oct 2014', company:'CMC Limited', role:'Software Developer', location:'Mumbai', bullets:['Developed Java/Spring MVC/Hibernate functionality for critical portal modules, fixed production issues and supported Study Material module change requests.']}
];

const projects = [
 {name:'Unified Monitoring & Observability Platform', tag:'OBSERVABILITY', icon:<Network/>, desc:'Enterprise observability modernization combining Metrics-as-Code, OpenTelemetry, Prometheus, Thanos and Splunk SignalFx.', details:['Multi-cluster Kubernetes monitoring','Standardized metrics and SLI/SLO practices','Spring Batch integration pipelines','Event-driven health-status propagation with AWS Lambda, SQS, EventBridge and API Gateway','Migration away from legacy monitoring patterns']},
 {name:'Multi-Cluster Observability Analytics', tag:'PLATFORM', icon:<Cpu/>, desc:'Operational intelligence layer correlating telemetry, OpsGenie alerts and Jira incidents to accelerate incident analysis.', details:['Recurring/common alert analysis','Cluster-specific incident identification','Cross-system correlation','APIs for monitoring integrations','Performance and resource optimization']},
 {name:'AI Coding Agent', tag:'GENAI + MCP', icon:<Bot/>, desc:'Autonomous development workflow connecting Jira and GitLab through MCP to turn low-risk tickets into code changes and Merge Requests.', details:['Jira ticket ingestion via MCP','Low-risk code changes and refactoring','GitLab Merge Request creation','Specification-driven development','Adopted by multiple development teams']},
 {name:'GenAI Incident Management Assistant', tag:'LLM', icon:<Bot/>, desc:'LLM-powered assistant for incident prioritization, classification and response recommendations.', details:['Incident analysis automation','Operational workflow assistance','LLM-based recommendations','Organizational hackathon — 1st place']},
 {name:'Metrics-as-Code / Wotan Modernization', tag:'SRE', icon:<Terminal/>, desc:'Next-generation SLI/SLO approach replacing the legacy Wotan solution with standardized, developer-friendly monitoring practices.', details:['Metrics-as-Code','Standardized SLI/SLO definitions','Developer self-service','Improved maintainability and reliability']},
 {name:'PaymentNet4', tag:'FINTECH', icon:<Database/>, desc:'Enterprise payment application work spanning Java/Spring, REST, React, cloud migration and the transition from monolith to microservices.', details:['Monolith-to-microservices migration','Cloud infrastructure','React mobile/web application','Spring + REST','Production support and critical fixes']},
 {name:'Personal Expense Dashboard', tag:'PERSONAL PROJECT', icon:<Database/>, desc:'A personal finance dashboard built after noticing there was no iOS app that could simply read bank messages/statements and turn them into a clear monthly expense picture.', details:['Upload HDFC bank statements and import transactions','Automatically categorize spending into expense types','Monthly dashboard showing where money is being spent','Designed to make recurring and high-spend categories easy to identify','Built to help understand spending patterns and reduce unnecessary expenses'], links:[{label:'UI — GitHub',url:'https://github.com/ashwaniagarwal226/expense-calculator-ui'},{label:'Backend — GitHub',url:'https://github.com/ashwaniagarwal226/expense-calculator'}]}
];

const commands = {
 help:['about','experience','projects','skills','education','contact','clear'],
 about:['Principal Software Engineer • 12+ years','Distributed systems • Cloud-native • Observability • AI-assisted engineering'],
 experience:['HERE Technologies → Principal Software Engineer','JPMorgan Chase → Associate / Java Developer / Software Engineer','Deloitte Consulting → Business Technology Analyst','Capgemini India → Software Engineer','CMC Limited → Software Developer'],
 projects:projects.map(p=>p.name),
 skills:Object.entries(skills).map(([k,v])=>`${k}: ${v.join(', ')}`),
 education:['B.E. — Siddaganga Institute of Technology (Visvesvaraya Technological University)'],
 contact:['Email: ashwini.agarwal@protonmail.com','LinkedIn: linkedin.com/in/ashwini-agarwal1311'],
};

function TerminalLine({children, prompt=true}){return <div className="term-line">{prompt && <span className="prompt">ashwini@principal-engineer:~$</span>}<span>{children}</span></div>}
function Section({id,command,children}){return <section id={id} className="section"><div className="section-cmd"><span className="prompt">ashwini@principal-engineer:~$</span> {command}</div>{children}</section>}
function App(){
 const [cmd,setCmd]=useState(''); const [history,setHistory]=useState([]); const [mobile,setMobile]=useState(false); const [copied,setCopied]=useState(false);
 const run=(raw)=>{const c=raw.trim().toLowerCase(); if(!c)return; if(c==='clear'){setHistory([]);setCmd('');return;} setHistory(h=>[...h,{input:raw,output:commands[c]||[`command not found: ${raw}`,`Type 'help' to see available commands.`]}]);setCmd('')};
 const nav=['about','experience','projects','skills','education','contact'];
 const copyEmail=()=>{navigator.clipboard?.writeText(profile.email);setCopied(true);setTimeout(()=>setCopied(false),1600)};
 return <div className="app">
  <header className="topbar"><div className="window-controls"><i/><i/><i/></div><div className="window-title"><Terminal size={14}/> <span>ashwini — portfolio</span></div><button className="menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button></header>
  <nav className={mobile?'nav open':'nav'}>{nav.map(n=><a key={n} href={`#${n}`} onClick={()=>setMobile(false)}><span>./</span>{n}</a>)}</nav>
  <main>
   <section className="hero" id="about"><div className="hero-grid"><div>
    <TerminalLine>whoami</TerminalLine><h1>{profile.name}</h1><div className="role">{profile.role}</div><p className="headline">{profile.headline}</p>
    <p className="summary">{profile.summary}</p>
    <div className="chips"><span>Java</span><span>Kubernetes</span><span>AWS</span><span>Observability</span><span>AI / MCP</span></div>
    <div className="actions"><a href={`mailto:${profile.email}`} className="btn primary"><Mail size={16}/> email</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn"><Linkedin size={16}/> linkedin</a> <a href={profile.github} target="_blank" rel="noreferrer" className="btn"><Github size={16}/> github</a></div>
   </div><div className="ascii"><pre>{`
             █████╗ ███████╗██╗  ██╗██╗    ██╗██╗███╗   ██╗██╗
            ██╔══██╗██╔════╝██║  ██║██║    ██║██║████╗  ██║██║
            ███████║███████╗███████║██║ █╗ ██║██║██╔██╗ ██║██║
            ██╔══██║╚════██║██╔══██║██║███╗██║██║██║╚██╗██║██║
            ██║  ██║███████║██║  ██║╚███╔███╔╝██║██║ ╚████║██║
            ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═╝
                                `}</pre><div className="system-status"><span className="dot"/> SYSTEM ONLINE<br/><small>distributed systems / cloud / ai</small></div></div></div></section>
   <Section id="experience" command="cat ./experience.log"><div className="timeline">{experience.map((e,i)=><article className="experience" key={i}><div className="time">{e.period}</div><div className="node"/><div><h3>{e.role}</h3><h4>{e.company} <span>• {e.location}</span></h4><ul>{e.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul></div></article>)}</div></Section>
   <Section id="projects" command="ls -la ./projects"><div className="project-grid">{projects.map((p,i)=><article className="project" key={i}><div className="project-head"><span className="icon">{p.icon}</span><span className="tag">{p.tag}</span></div><h3>{p.name}</h3><p>{p.desc}</p><ul>{p.details.map((d,j)=><li key={j}>{d}</li>)}</ul>{p.links&&<div className="project-links">{p.links.map(l=><a key={l.url} href={l.url} target="_blank" rel="noreferrer"><Github size={14}/> {l.label} <ExternalLink size={12}/></a>)}</div>}</article>)}</div></Section>
   <Section id="skills" command="cat ./stack.json"><div className="skills-grid">{Object.entries(skills).map(([k,v])=><article className="skill" key={k}><h3><span>{'{'} </span>{k}<span> {'}'}</span></h3><div>{v.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></Section>
   <Section id="education" command="cat ./education.txt"><div className="education"><GraduationCap/><div><h3>B.E.</h3><p>Siddaganga Institute of Technology</p><small>Visvesvaraya Technological University</small></div></div><div className="awards"><Award/><div><h3>Recognition</h3><p>1st Place — Organizational Hackathon for a GenAI-powered Incident Management Assistant.</p><p>Additional awards received in 2016, 2017, 2018 and 2019 for enhancement, infrastructure design and application development work.</p></div></div></Section>
   <Section id="contact" command="./connect.sh"><div className="contact"><div><h2>Let’s build something that scales.</h2><p>Open to conversations around principal engineering, distributed systems, platform architecture, observability and AI-assisted engineering.</p></div><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail/> {profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn <ExternalLink size={14}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github/> GitHub <ExternalLink size={14}/></a></div></div></Section>
   <section className="terminal-console"><div className="console-title"><span>interactive shell</span><span>type <b>help</b></span></div><div className="console-body"><TerminalLine>help</TerminalLine><div className="help-grid">{commands.help.map(c=><button key={c} onClick={()=>{if(c==='clear')setHistory([]);else run(c)}}>{c}</button>)}</div>{history.map((h,i)=><div className="history" key={i}><TerminalLine>{h.input}</TerminalLine>{h.output.map((x,j)=><div className="output" key={j}>{x}</div>)}</div>)}<form onSubmit={e=>{e.preventDefault();run(cmd)}} className="command-form"><span className="prompt">ashwini@principal-engineer:~$</span><input autoComplete="off" value={cmd} onChange={e=>setCmd(e.target.value)} aria-label="Terminal command"/></form></div></section>
  </main><footer><span>Ashwini Agarwal {new Date().getFullYear()}</span></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
