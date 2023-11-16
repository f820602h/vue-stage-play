import{u as o,c as r,k as a,t as e,l as n,Q as i,a as s,o as c}from"./chunks/framework.42e212fd.js";const d=i(`<h1 id="runtime-api-examples" tabindex="-1">Runtime API Examples <a class="header-anchor" href="#runtime-api-examples" aria-label="Permalink to &quot;Runtime API Examples&quot;">​</a></h1><p>This page demonstrates usage of some of the runtime APIs provided by VitePress.</p><p>The main <code>useData()</code> API can be used to access site, theme, and page data for the current page. It works in both <code>.md</code> and <code>.vue</code> files:</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#DBD7CAEE;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#DBD7CAEE;">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#DBD7CAEE;">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="color:#DBD7CAEE;">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;font-weight:bold;">##</span><span style="color:#4D9375;font-weight:bold;"> Results</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;font-weight:bold;">###</span><span style="color:#4D9375;font-weight:bold;"> Theme Data</span></span>
<span class="line"><span style="color:#DBD7CAEE;">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;font-weight:bold;">###</span><span style="color:#4D9375;font-weight:bold;"> Page Data</span></span>
<span class="line"><span style="color:#DBD7CAEE;">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#666666;font-weight:bold;">###</span><span style="color:#4D9375;font-weight:bold;"> Page Frontmatter</span></span>
<span class="line"><span style="color:#DBD7CAEE;">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#393A34;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#393A34;">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#393A34;">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="color:#393A34;">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;font-weight:bold;">##</span><span style="color:#1C6B48;font-weight:bold;"> Results</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;font-weight:bold;">###</span><span style="color:#1C6B48;font-weight:bold;"> Theme Data</span></span>
<span class="line"><span style="color:#393A34;">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;font-weight:bold;">###</span><span style="color:#1C6B48;font-weight:bold;"> Page Data</span></span>
<span class="line"><span style="color:#393A34;">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#999999;font-weight:bold;">###</span><span style="color:#1C6B48;font-weight:bold;"> Page Frontmatter</span></span>
<span class="line"><span style="color:#393A34;">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre></div><h2 id="results" tabindex="-1">Results <a class="header-anchor" href="#results" aria-label="Permalink to &quot;Results&quot;">​</a></h2><h3 id="theme-data" tabindex="-1">Theme Data <a class="header-anchor" href="#theme-data" aria-label="Permalink to &quot;Theme Data&quot;">​</a></h3>`,6),h=a("h3",{id:"page-data",tabindex:"-1"},[s("Page Data "),a("a",{class:"header-anchor",href:"#page-data","aria-label":'Permalink to "Page Data"'},"​")],-1),m=a("h3",{id:"page-frontmatter",tabindex:"-1"},[s("Page Frontmatter "),a("a",{class:"header-anchor",href:"#page-frontmatter","aria-label":'Permalink to "Page Frontmatter"'},"​")],-1),g=a("h2",{id:"more",tabindex:"-1"},[s("More "),a("a",{class:"header-anchor",href:"#more","aria-label":'Permalink to "More"'},"​")],-1),u=a("p",null,[s("Check out the documentation for the "),a("a",{href:"https://vitepress.dev/reference/runtime-api#usedata",target:"_blank",rel:"noreferrer"},"full list of runtime APIs"),s(".")],-1),A=JSON.parse('{"title":"Runtime API Examples","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"api-examples.md","filePath":"api-examples.md"}'),f={name:"api-examples.md"},E=Object.assign(f,{setup(b){const{site:D,theme:t,page:l,frontmatter:p}=o();return(_,y)=>(c(),r("div",null,[d,a("pre",null,e(n(t)),1),h,a("pre",null,e(n(l)),1),m,a("pre",null,e(n(p)),1),g,u]))}});export{A as __pageData,E as default};
