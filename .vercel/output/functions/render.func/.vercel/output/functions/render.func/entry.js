import * as adapter from '@astrojs/vercel/serverless/entrypoint';
import { h, Component } from 'preact';
import render from 'preact-render-to-string';
import { escape } from 'html-escaper';
import { S as Styles$3 } from './chunks/index.03de1cb4.mjs';
import { S as Styles$1, a as Styles$2 } from './chunks/project-find-your-hat-index-project-nested-lunar-eclipse-404-about.be17c703.mjs';
import { S as Styles } from './chunks/project-find-your-hat-index-project-nested-lunar-eclipse.849967ac.mjs';
import { jsx, jsxs } from 'preact/jsx-runtime';
/* empty css                        */import 'mime';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to Preact that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return h('astro-slot', { name, dangerouslySetInnerHTML: { __html: value } });
};

/**
 * This tells Preact to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());

let originalConsoleError$1;
let consoleFilterRefs$1 = 0;

function check$1(Component$1, props, children) {
	if (typeof Component$1 !== 'function') return false;

	if (Component$1.prototype != null && typeof Component$1.prototype.render === 'function') {
		return Component.isPrototypeOf(Component$1);
	}

	useConsoleFilter$1();

	try {
		try {
			const { html } = renderToStaticMarkup$1(Component$1, props, children);
			if (typeof html !== 'string') {
				return false;
			}

			// There are edge cases (SolidJS) where Preact *might* render a string,
			// but components would be <undefined></undefined>

			return !/\<undefined\>/.test(html);
		} catch (err) {
			return false;
		}
	} finally {
		finishUsingConsoleFilter$1();
	}
}

function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName$1(key);
		slots[name] = h(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = { ...props, ...slots };
	const html = render(
		h(Component, newProps, children != null ? h(StaticHtml, { value: children }) : children)
	);
	return { html };
}

/**
 * Reduces console noise by filtering known non-problematic errors.
 *
 * Performs reference counting to allow parallel usage from async code.
 *
 * To stop filtering, please ensure that there always is a matching call
 * to `finishUsingConsoleFilter` afterwards.
 */
function useConsoleFilter$1() {
	consoleFilterRefs$1++;

	if (!originalConsoleError$1) {
		// eslint-disable-next-line no-console
		originalConsoleError$1 = console.error;

		try {
			// eslint-disable-next-line no-console
			console.error = filteredConsoleError$1;
		} catch (error) {
			// If we're unable to hook `console.error`, just accept it
		}
	}
}

/**
 * Indicates that the filter installed by `useConsoleFilter`
 * is no longer needed by the calling code.
 */
function finishUsingConsoleFilter$1() {
	consoleFilterRefs$1--;

	// Note: Instead of reverting `console.error` back to the original
	// when the reference counter reaches 0, we leave our hook installed
	// to prevent potential race conditions once `check` is made async
}

/**
 * Hook/wrapper function for the global `console.error` function.
 *
 * Ignores known non-problematic errors while any code is using the console filter.
 * Otherwise, simply forwards all arguments to the original function.
 */
function filteredConsoleError$1(msg, ...rest) {
	if (consoleFilterRefs$1 > 0 && typeof msg === 'string') {
		// In `check`, we attempt to render JSX components through Preact.
		// When attempting this on a React component, React may output
		// the following error, which we can safely filter out:
		const isKnownReactHookError =
			msg.includes('Warning: Invalid hook call.') &&
			msg.includes('https://reactjs.org/link/invalid-hook-call');
		if (isKnownReactHookError) return;
	}
	originalConsoleError$1(msg, ...rest);
}

const _renderer1 = {
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
};

const ASTRO_VERSION = "1.0.5";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7
};
function serializeArray(value) {
  return value.map((v) => convertToSerializedForm(v));
}
function serializeObject(value) {
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v)];
    })
  );
}
function convertToSerializedForm(value) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props) {
  return JSON.stringify(serializeObject(props));
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(componentUrl);
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(renderer.clientEntrypoint);
    island.props["props"] = escapeHTML(serializeProps(props));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  island.props["before-hydration-url"] = await result.resolve("astro:scripts/before-hydration.js");
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=a=>{const e=async()=>{await(await a())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()};`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}};`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=a=>{(async()=>await(await a())())()};`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(i,c,n)=>{const r=async()=>{await(await i())()};let s=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){s.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];s.observe(t)}};`;

var astro_island_prebuilt_default = `var a;{const l={0:t=>t,1:t=>JSON.parse(t,n),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,n)),5:t=>new Set(JSON.parse(t,n)),6:t=>BigInt(t),7:t=>new URL(t)},n=(t,r)=>{if(t===""||!Array.isArray(r))return r;const[s,i]=r;return s in l?l[s](i):void 0};customElements.get("astro-island")||customElements.define("astro-island",(a=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement?.closest("astro-island[ssr]"))return;const r=this.querySelectorAll("astro-slot"),s={},i=this.querySelectorAll("template[data-astro-template]");for(const e of i)!e.closest(this.tagName)?.isSameNode(this)||(s[e.getAttribute("data-astro-template")||"default"]=e.innerHTML,e.remove());for(const e of r)!e.closest(this.tagName)?.isSameNode(this)||(s[e.getAttribute("name")||"default"]=e.innerHTML);const o=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),n):{};this.hydrator(this)(this.Component,o,s,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((r,s)=>{s.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate),await import(this.getAttribute("before-hydration-url"));const r=JSON.parse(this.getAttribute("opts"));Astro[this.getAttribute("client")](async()=>{const s=this.getAttribute("renderer-url"),[i,{default:o}]=await Promise.all([import(this.getAttribute("component-url")),s?import(s):()=>()=>{}]),e=this.getAttribute("component-export")||"default";if(!e.includes("."))this.Component=i[e];else{this.Component=i;for(const c of e.split("."))this.Component=this.Component[c]}return this.hydrator=o,this.hydrate},r,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},a.observedAttributes=["props"],a))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = {"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let html = "";
  for await (const chunk of renderAstroComponent(Component)) {
    html += stringifyChunk(result, chunk);
  }
  return html;
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof HTMLString) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (typeof child === "object" && Symbol.asyncIterator in child) {
    yield* child;
  } else {
    yield child;
  }
}
async function renderSlot(result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        content += stringifyChunk(result, chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(content);
  }
  return fallback;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?<!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `let ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (Component && Component.isAstroComponentFactory) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const children2 = {};
      if (slots) {
        await Promise.all(
          Object.entries(slots).map(
            ([key, value]) => renderSlot(result, value).then((output) => {
              children2[key] = output;
            })
          )
        );
      }
      const html2 = Component.render({ slots: children2 });
      return markHTMLString(html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          children[key] = output;
        })
      )
    );
  }
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
      return html;
    }
    return markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
const alreadyHeadRenderedResults = /* @__PURE__ */ new WeakSet();
function renderHead(result) {
  alreadyHeadRenderedResults.add(result);
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

new TextEncoder();

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let body = "";
        for await (const chunk of output) {
          let html = stringifyChunk(result, chunk);
          body += html;
        }
        return markHTMLString(body);
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$metadata$4 = createMetadata("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/components/MainHead.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$5 = createAstro("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/components/MainHead.astro", "", "file:///C:/Users/HP/my-portfolio/my-portfolio/");
const $$MainHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MainHead;
  const { title = "Prachak Portfolio", description = "Prachak Tocheewee Por" } = Astro2.props;
  return renderTemplate`<meta charset="UTF-8">
<meta name="description" property="og:description"${addAttribute(description, "content")}>
<meta name="viewport" content="width=device-width">
<meta name="generator"${addAttribute(Astro2.generator, "content")}>
<title>${title}</title>

<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700;900&display=swap" rel="stylesheet">
`;
});

const $$file$4 = "C:/Users/HP/my-portfolio/my-portfolio/src/components/MainHead.astro";
const $$url$4 = undefined;

const $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$4,
	default: $$MainHead,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

function Button({
  children
}) {
  return jsx("span", {
    className: Styles.button,
    children
  });
}

const $$module2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Button
}, Symbol.toStringTag, { value: 'Module' }));

function Nav() {
  return jsxs("nav", {
    className: Styles$1.nav,
    id: "top",
    children: [jsx("a", {
      className: Styles$1.logolink,
      href: "/",
      children: jsx("div", {
        className: Styles$1.monogram,
        children: "Por"
      })
    }), jsx("a", {
      className: Styles$1.link,
      href: "#about",
      children: "About"
    }), jsx("a", {
      className: Styles$1.link,
      href: "#interests",
      children: "Interests"
    }), jsx("a", {
      className: Styles$1.link,
      href: "#projects",
      children: "Project"
    }), jsx("a", {
      className: Styles$1.link,
      href: "#skills",
      children: "Skills"
    }), jsx("a", {
      className: Styles$1.link,
      href: "#contact",
      children: "Contact"
    }), jsx("a", {
      className: Styles$1.social,
      href: "https://www.facebook.com/prachak.mathematics",
      target: "_blank",
      children: jsx("img", {
        className: Styles$1.socialicon,
        src: "https://www.facebook.com/images/fb_icon_325x325.png",
        sizes: "0 0 16 16"
      })
    }), jsx("a", {
      className: Styles$1.social,
      href: "https://github.com/PrachakTocheewee",
      target: "_blank",
      children: jsx("img", {
        className: Styles$1.socialicon,
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/128px-Github-desktop-logo-symbol.svg.png?20200316183539",
        sizes: "0 0 16 16"
      })
    }), jsx("a", {
      className: Styles$1.social,
      href: "https://www.linkedin.com/in/prachak-tocheewee-405475245/",
      target: "_blank",
      children: jsx("img", {
        className: Styles$1.socialicon,
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png",
        sizes: "0 0 16 16"
      })
    })]
  });
}

const $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Nav
}, Symbol.toStringTag, { value: 'Module' }));

function Footer() {
  return jsxs("footer", {
    className: Styles$2.footer,
    children: ["\xA9 ", new Date().getFullYear(), " Prachak Tocheewee", jsx("p", {
      className: "byline",
      children: " \u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50\u2B50"
    })]
  });
}

const $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Footer
}, Symbol.toStringTag, { value: 'Module' }));

function PortfolioPreview() {
  return jsxs("div", {
    className: "card",
    children: [jsx("div", {
      className: "titleCard",
      style: "",
      children: jsx("h1", {
        className: "title",
        children: "Find Your Hat"
      })
    }), jsxs("div", {
      className: "pa3",
      children: [jsx("p", {
        className: "desc",
        children: "Interactive terminal game that the player has lost their hat and they must navigate back to it without falling in to the holes"
      }), jsxs("div", {
        className: Styles$3.tags,
        children: ["Tagged:", frontmatter.tags.map((t) => jsx("div", {
          className: Styles$3.tag,
          "data-tag": t,
          children: t
        }))]
      }), jsx("a", {
        className: Styles$3.link,
        href: project.url,
        children: jsx("span", {
          className: Styles$3.linkInner,
          children: "View"
        })
      })]
    })]
  });
}

const $$module5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: PortfolioPreview
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/index.astro", { modules: [{ module: $$module1, specifier: "../components/MainHead.astro", assert: {} }, { module: $$module2$1, specifier: "../components/Button/index.jsx", assert: {} }, { module: $$module3, specifier: "../components/Nav/index.jsx", assert: {} }, { module: $$module2, specifier: "../components/Footer/index.jsx", assert: {} }, { module: $$module5, specifier: "../components/PortfolioPreview/index.jsx", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$4 = createAstro("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/index.astro", "", "file:///C:/Users/HP/my-portfolio/my-portfolio/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index;
  const projects = await Astro2.glob(/* #__PURE__ */ Object.assign({"./project/find-your-hat.md": () => Promise.resolve().then(() => _page2),"./project/nested/lunar-eclipse.md": () => Promise.resolve().then(() => _page3)}), () => "./project/**/*.md");
  projects[0];
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html lang="en" class="astro-223OJNBM">
	<head>
		${renderComponent($$result, "MainHead", $$MainHead, { "title": "Prachak Tocheewee", "description": "Por Portfolio", "class": "astro-223OJNBM" })}
		
	${renderHead($$result)}</head>
	<body class="astro-223OJNBM">
		${renderComponent($$result, "Nav", Nav, { "class": "astro-223OJNBM" })}
		<header class="hero astro-223OJNBM">
			<img width="1600" height="1131" class="img astro-223OJNBM" src="https://www.freepik.com/free-vector/gradient-galaxy-background_14658088.htm#query=galaxy&position=1&from_view=keyword" srcset="https://img.freepik.com/free-vector/gradient-galaxy-background_23-2148983655.jpg?w=740&t=st=1660807942~exp=1660808542~hmac=ee804e617889ce99f394ff928af0bb76ba3675b25eb1dac271718b722b8647d4" sizes="(max-width: 800px) 800px, (max-width: 1200px) 1200px, (max-width: 1600px) 1600px, (max-width: 2400px) 2400px, 1200px">
			<div class="gradient astro-223OJNBM"></div>
			<div class="gradient2 astro-223OJNBM"></div>
			<div class="overlay astro-223OJNBM">
				<h1 class="title astro-223OJNBM">
					<small class="subtitle astro-223OJNBM">Junoir Software Developer
					</small>Prachak Tocheewee (Por)
				</h1>
				<div class="astro-223OJNBM">
					<span class="role astro-223OJNBM">💻 Developer <span class="invert astro-223OJNBM">💻 Developer</span>
					</span>&nbsp;
					<span class="role astro-223OJNBM">📈 Data Analyst <span class="invert astro-223OJNBM">📈 Data Analyst
						</span>
					</span>&nbsp;
					<span class="role astro-223OJNBM">❕ Software Tester <span class="invert astro-223OJNBM">❕ Software Tester
						</span>
					</span>
				</div>
				<p class="desc astro-223OJNBM">Love coding</p>
			</div>
		</header>
		<main class="wrapper mt4 mb4 astro-223OJNBM">
			<div class="grid astro-223OJNBM">
				<div class="section astro-223OJNBM">
					<h3 class="sectionTitle astro-223OJNBM" id="projects">My Projects</h3>
					<p class="sectionSubTitle astro-223OJNBM">1.Find Your Hat</p><p class="des astro-223OJNBM">
						&nbsp;&nbsp;&nbsp;&nbsp;Interactive terminal game that
						the player has lost their hat and they must navigate
						back to it without falling in to the holes.
						<a class="projectlink astro-223OJNBM" href="https://replit.com/@PrachakTocheewe/find-yourhat#
index.js" target="_blank">
							<br class="astro-223OJNBM">
							<button class="btnproject astro-223OJNBM">view</button>
						</a>
					</p>

					<p class="sectionSubTitle astro-223OJNBM">2.Jammming</p><p class="des astro-223OJNBM">
					</p><p class="des astro-223OJNBM">
						&nbsp;&nbsp;&nbsp;&nbsp;React web application creating a
						playlist with the Spotify API which allows users to
						search the Spotify library, create a customized
						playlist, then save it to their Spotify accounts.
						<a class="projectlink astro-223OJNBM" href="http://prachak32-jammming.surge.sh" target="_blank">
							<br class="astro-223OJNBM">
							<button class="btnproject astro-223OJNBM">view</button>
						</a>
					</p>

					<p class="sectionSubTitle astro-223OJNBM">3.Infinity Health</p>
					<p class="des astro-223OJNBM">
						&nbsp;&nbsp;&nbsp;&nbsp;Final group project: an
						exercise-tracker using MERN stack website which allows
						users to keep records of their excercise
						activities--adding, editing, deleting their activities
						with reminders and their achieved milestones

						<a class="projectlink astro-223OJNBM" href="https://infinity-health.vercel.app/" target="_blank">
							<br class="astro-223OJNBM">
							<button class="btnproject astro-223OJNBM">view</button>
						</a>
					</p>

					
				</div>

				<div class="section astro-223OJNBM">
					<h3 class="sectionTitle astro-223OJNBM" id="about">About me</h3>
					<p class="bio astro-223OJNBM">
						<span class="astro-223OJNBM">Hello!</span>&nbsp;&nbsp;&nbsp;&nbsp;I am a highly
						analytical individual with a systematic thinking process
						who eagers to learn new things. With background in
						mathematics, statistics, and data analysis, I would like
						to apply my background knowledge to pursue my career as
						a Software Developer.
					</p>
				</div>

				<div class="section astro-223OJNBM">
					<h3 class="sectionTitle astro-223OJNBM" id="skills">Technical Skills</h3>
					<p class="bio astro-223OJNBM"></p><ul class="bio astro-223OJNBM">
						<li class="astro-223OJNBM">HTML</li>
						<li class="astro-223OJNBM">Git & GitHub</li>
						<li class="astro-223OJNBM">Data Analysis with SPSS R, and Microsoft Excel</li>
						<li class="astro-223OJNBM">CSS</li>
						<li class="astro-223OJNBM">JavaScript</li>
						<li class="astro-223OJNBM">C++</li>
						<li class="astro-223OJNBM">ReactJS</li>
						<li class="astro-223OJNBM">NodeJS</li>
						<li class="astro-223OJNBM">Express</li>
						<li class="astro-223OJNBM">MongoDB</li>
						<li class="astro-223OJNBM">SQL</li>
					</ul>
				</div>

				<div class="section astro-223OJNBM">
					<h3 class="sectionTitle astro-223OJNBM">Soft Skills</h3>
					<p class="bio astro-223OJNBM"></p><ul class="bio astro-223OJNBM">
						<li class="astro-223OJNBM">Agile & Scrum Methodology</li>
						<li class="astro-223OJNBM">Growth Mindset</li>
						<li class="astro-223OJNBM">Effective Problem Solving</li>
						<li class="astro-223OJNBM">Knowledge Enthusiast for Skills Improvement</li>
					</ul>
				</div>

				<div class="section astro-223OJNBM">
					<h3 class="sectionTitle astro-223OJNBM" id="contact">Contact</h3>
					<p class="bio astro-223OJNBM"></p><ul class="bio astro-223OJNBM">
						<li class="astro-223OJNBM"><span class="bold astro-223OJNBM">Mobile</span> 0860025138</li>
						<li class="astro-223OJNBM">
							<span class="bold astro-223OJNBM">E-mail</span>
							prachak.toc@gmail.com
						</li>
						<li class="astro-223OJNBM">
							<span class="bold astro-223OJNBM">GitHub</span>
							github.com/PrachakTocheewee
						</li>

						<li class="astro-223OJNBM">
							<span class="bold astro-223OJNBM">Address</span>
							22 Moo.5, Tambon Banbua , Kraset Sombun, Chaiyaphum,
							36120 , Thailand
						</li>
					</ul>
				</div>

				<div class="section astro-223OJNBM">
					<h3 class="sectionTitle astro-223OJNBM" id="interests">Interests</h3>
					<p class="bio astro-223OJNBM"></p><ul class="bio astro-223OJNBM">
						<li class="astro-223OJNBM">Websites Development</li>
						<li class="astro-223OJNBM">Data Science</li>
						<li class="astro-223OJNBM">Software Tester</li>
					</ul>
				</div>
			</div>

						<div class="gotop astro-223OJNBM">
						<div class="role astro-223OJNBM">
						<a href="#top" class="astro-223OJNBM">
							${renderComponent($$result, "Button", Button, { "class": "astro-223OJNBM" }, { "default": () => renderTemplate`Go to top` })}
						</a>
					</div>
					</div>
		</main>

		${renderComponent($$result, "Footer", Footer, { "class": "astro-223OJNBM" })}
	</body></html>`;
});

const $$file$3 = "C:/Users/HP/my-portfolio/my-portfolio/src/pages/index.astro";
const $$url$3 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$3,
	default: $$Index,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/projects.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$3 = createAstro("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/projects.astro", "", "file:///C:/Users/HP/my-portfolio/my-portfolio/");
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Projects;
  return renderTemplate`<!-- 
import MainHead from "../components/MainHead.astro";
import Footer from "../components/Footer/index.jsx";
import Nav from "../components/Nav/index.jsx";
import PortfolioPreview from "../components/PortfolioPreview/index.jsx";

const projects = (await Astro.glob("./project/**/*.md"))
	.filter(({ frontmatter }) => !!frontmatter.publishDate)
	.sort(
		(a, b) =>
			new Date(b.frontmatter.publishDate).valueOf() -
			new Date(a.frontmatter.publishDate).valueOf()
	);

<html lang="en">
	<head>
		<MainHead
			title="My Projects | Prachak Tocheewee"
			description="Prachak's  projects"
		/>
		<style lang="scss">
			.grid {
				display: grid;
				grid-gap: 3rem;
			}
		</style>
	</head>
	<body>
		<Nav />
		<div class="wrapper">
			<h1 class="title mt4 mb4">My Projects</h1>
			<div class="grid">
				{
					projects.map((project) => (
						/*<PortfolioPreview project={project} />*/
					))
				}
			</div>
		</div>
		<Footer />
	</body>
</html> -->`;
});

const $$file$2 = "C:/Users/HP/my-portfolio/my-portfolio/src/pages/projects.astro";
const $$url$2 = "/projects";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$2,
	default: $$Projects,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

createMetadata("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/layouts/project.astro", { modules: [{ module: $$module1, specifier: "../components/MainHead.astro", assert: {} }, { module: $$module2$1, specifier: "../components/Button/index.jsx", assert: {} }, { module: $$module2, specifier: "../components/Footer/index.jsx", assert: {} }, { module: $$module3, specifier: "../components/Nav/index.jsx", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$2 = createAstro("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/layouts/project.astro", "", "file:///C:/Users/HP/my-portfolio/my-portfolio/");
const $$Project = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Project;
  const { content } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html${addAttribute(content.lang || "en", "lang")} class="astro-FNBAIWJC">
	<head>
		${renderComponent($$result, "MainHead", $$MainHead, { "title": content.title, "description": content.description, "class": "astro-FNBAIWJC" })}
		
	${renderHead($$result)}</head>
	<body class="astro-FNBAIWJC">
		${renderComponent($$result, "Nav", Nav, { "class": "astro-FNBAIWJC" })}
		<header${addAttribute(`background-image:url(${content.img})`, "style")} class="hero astro-FNBAIWJC">
			<h1 class="title astro-FNBAIWJC">${content.title}</h1>
		</header>
		<div class="leadIn astro-FNBAIWJC">
			<div class="wrapper pt8 pb8 mb8 tac astro-FNBAIWJC">
				${content.tags.map((t) => renderTemplate`<span class="tag astro-FNBAIWJC">${t}</span>`)}
				<h3 class="tagline astro-FNBAIWJC">${content.description}</h3>
			</div>
		</div>
		<div class="wrapper wrapper__readable astro-FNBAIWJC">
			<div class="content astro-FNBAIWJC">${renderSlot($$result, $$slots["default"])}</div>
		</div>
		<footer class="tac mt6 astro-FNBAIWJC">
			<a href="/projects" class="astro-FNBAIWJC">
				${renderComponent($$result, "Button", Button, { "class": "astro-FNBAIWJC" }, { "default": () => renderTemplate`View More` })}
			</a>
		</footer>
		${renderComponent($$result, "Footer", Footer, { "class": "astro-FNBAIWJC" })}
	</body></html>`;
});

const html$1 = "<p>Rubber cheese mascarpone cut the cheese. Jarlsberg parmesan cheesy grin cream cheese port-salut stinking bishop ricotta brie. Roquefort when the cheese comes out everybody’s happy goat cheese triangles stilton cheese and biscuits goat babybel. Bocconcini roquefort queso danish fontina pecorino.</p>\n<p>Smelly cheese stinking bishop roquefort. Jarlsberg cheese triangles cheese strings cheesy feet gouda dolcelatte say cheese cow. Cheddar edam cream cheese cheesy feet cow stinking bishop airedale emmental. Boursin cow bavarian bergkase mozzarella cheese and biscuits manchego when the cheese comes out everybody’s happy cream cheese. Cheese on toast st. agur blue cheese croque monsieur halloumi.</p>\n<p>Fromage frais jarlsberg st. agur blue cheese. Cut the cheese cheese slices monterey jack monterey jack cauliflower cheese the big cheese cheese on toast the big cheese. Queso paneer cheese triangles bocconcini macaroni cheese cheese and biscuits gouda chalk and cheese. Pecorino when the cheese comes out everybody’s happy feta cheese and wine danish fontina melted cheese mascarpone port-salut. When the cheese comes out everybody’s happy pecorino cottage cheese.</p>\n<p>Caerphilly parmesan manchego. Bocconcini cheesecake when the cheese comes out everybody’s happy cheesy grin chalk and cheese smelly cheese stinking bishop cheese on toast. Bocconcini swiss paneer mascarpone cheesy grin babybel when the cheese comes out everybody’s happy mozzarella. Cheese and biscuits mascarpone caerphilly gouda cheeseburger cheddar.</p>\n<p>Cheese and biscuits cheesy grin roquefort. Ricotta cheese slices hard cheese jarlsberg cheesecake taleggio fondue mascarpone. Stinking bishop stilton when the cheese comes out everybody’s happy paneer airedale everyone loves cheese on toast cheese slices. Ricotta cut the cheese cheese triangles babybel cream cheese ricotta.</p>";

				const frontmatter$2 = {"layout":"../../layouts/project.astro","title":"Find Your Hat","client":"Self","publishDate":"2020-03-02T00:00:00.000Z","img":".\\pages\\project\\FindYourHat.jpg","description":"Interactive terminal game that the player has lost their hat and they must navigate back to it without falling in to the holes.","tags":["JavaScript","dev","game"]};
				const file$1 = "C:/Users/HP/my-portfolio/my-portfolio/src/pages/project/find-your-hat.md";
				const url$1 = "/project/find-your-hat";
				function rawContent$1() {
					return "\nRubber cheese mascarpone cut the cheese. Jarlsberg parmesan cheesy grin cream cheese port-salut stinking bishop ricotta brie. Roquefort when the cheese comes out everybody's happy goat cheese triangles stilton cheese and biscuits goat babybel. Bocconcini roquefort queso danish fontina pecorino.\n\nSmelly cheese stinking bishop roquefort. Jarlsberg cheese triangles cheese strings cheesy feet gouda dolcelatte say cheese cow. Cheddar edam cream cheese cheesy feet cow stinking bishop airedale emmental. Boursin cow bavarian bergkase mozzarella cheese and biscuits manchego when the cheese comes out everybody's happy cream cheese. Cheese on toast st. agur blue cheese croque monsieur halloumi.\n\nFromage frais jarlsberg st. agur blue cheese. Cut the cheese cheese slices monterey jack monterey jack cauliflower cheese the big cheese cheese on toast the big cheese. Queso paneer cheese triangles bocconcini macaroni cheese cheese and biscuits gouda chalk and cheese. Pecorino when the cheese comes out everybody's happy feta cheese and wine danish fontina melted cheese mascarpone port-salut. When the cheese comes out everybody's happy pecorino cottage cheese.\n\nCaerphilly parmesan manchego. Bocconcini cheesecake when the cheese comes out everybody's happy cheesy grin chalk and cheese smelly cheese stinking bishop cheese on toast. Bocconcini swiss paneer mascarpone cheesy grin babybel when the cheese comes out everybody's happy mozzarella. Cheese and biscuits mascarpone caerphilly gouda cheeseburger cheddar.\n\nCheese and biscuits cheesy grin roquefort. Ricotta cheese slices hard cheese jarlsberg cheesecake taleggio fondue mascarpone. Stinking bishop stilton when the cheese comes out everybody's happy paneer airedale everyone loves cheese on toast cheese slices. Ricotta cut the cheese cheese triangles babybel cream cheese ricotta.\n";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [];
				}
				function getHeaders$1() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$1();
				}				async function Content$1() {
					const { layout, ...content } = frontmatter$2;
					content.file = file$1;
					content.url = url$1;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$Project, {
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$2,
	file: file$1,
	url: url$1,
	rawContent: rawContent$1,
	compiledContent: compiledContent$1,
	getHeadings: getHeadings$1,
	getHeaders: getHeaders$1,
	Content: Content$1,
	default: Content$1
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<p>Rubber cheese mascarpone cut the cheese. Jarlsberg parmesan cheesy grin cream cheese port-salut stinking bishop ricotta brie. Roquefort when the cheese comes out everybody’s happy goat cheese triangles stilton cheese and biscuits goat babybel. Bocconcini roquefort queso danish fontina pecorino.</p>\n<p>Smelly cheese stinking bishop roquefort. Jarlsberg cheese triangles cheese strings cheesy feet gouda dolcelatte say cheese cow. Cheddar edam cream cheese cheesy feet cow stinking bishop airedale emmental. Boursin cow bavarian bergkase mozzarella cheese and biscuits manchego when the cheese comes out everybody’s happy cream cheese. Cheese on toast st. agur blue cheese croque monsieur halloumi.</p>\n<p>Fromage frais jarlsberg st. agur blue cheese. Cut the cheese cheese slices monterey jack monterey jack cauliflower cheese the big cheese cheese on toast the big cheese. Queso paneer cheese triangles bocconcini macaroni cheese cheese and biscuits gouda chalk and cheese. Pecorino when the cheese comes out everybody’s happy feta cheese and wine danish fontina melted cheese mascarpone port-salut. When the cheese comes out everybody’s happy pecorino cottage cheese.</p>\n<p>Caerphilly parmesan manchego. Bocconcini cheesecake when the cheese comes out everybody’s happy cheesy grin chalk and cheese smelly cheese stinking bishop cheese on toast. Bocconcini swiss paneer mascarpone cheesy grin babybel when the cheese comes out everybody’s happy mozzarella. Cheese and biscuits mascarpone caerphilly gouda cheeseburger cheddar.</p>\n<p>Cheese and biscuits cheesy grin roquefort. Ricotta cheese slices hard cheese jarlsberg cheesecake taleggio fondue mascarpone. Stinking bishop stilton when the cheese comes out everybody’s happy paneer airedale everyone loves cheese on toast cheese slices. Ricotta cut the cheese cheese triangles babybel cream cheese ricotta.</p>";

				const frontmatter$1 = {"layout":"../../../layouts/project.astro","title":"Jammming","client":"Self","publishDate":"2020-03-04T00:00:00.000Z","img":"https://images.unsplash.com/photo-1548391350-1a529f6ea42d?fit=crop&w=1400&h=700&q=75","description":null,"tags":["design","dev","branding"]};
				const file = "C:/Users/HP/my-portfolio/my-portfolio/src/pages/project/nested/lunar-eclipse.md";
				const url = "/project/nested/lunar-eclipse";
				function rawContent() {
					return "\nRubber cheese mascarpone cut the cheese. Jarlsberg parmesan cheesy grin cream cheese port-salut stinking bishop ricotta brie. Roquefort when the cheese comes out everybody's happy goat cheese triangles stilton cheese and biscuits goat babybel. Bocconcini roquefort queso danish fontina pecorino.\n\nSmelly cheese stinking bishop roquefort. Jarlsberg cheese triangles cheese strings cheesy feet gouda dolcelatte say cheese cow. Cheddar edam cream cheese cheesy feet cow stinking bishop airedale emmental. Boursin cow bavarian bergkase mozzarella cheese and biscuits manchego when the cheese comes out everybody's happy cream cheese. Cheese on toast st. agur blue cheese croque monsieur halloumi.\n\nFromage frais jarlsberg st. agur blue cheese. Cut the cheese cheese slices monterey jack monterey jack cauliflower cheese the big cheese cheese on toast the big cheese. Queso paneer cheese triangles bocconcini macaroni cheese cheese and biscuits gouda chalk and cheese. Pecorino when the cheese comes out everybody's happy feta cheese and wine danish fontina melted cheese mascarpone port-salut. When the cheese comes out everybody's happy pecorino cottage cheese.\n\nCaerphilly parmesan manchego. Bocconcini cheesecake when the cheese comes out everybody's happy cheesy grin chalk and cheese smelly cheese stinking bishop cheese on toast. Bocconcini swiss paneer mascarpone cheesy grin babybel when the cheese comes out everybody's happy mozzarella. Cheese and biscuits mascarpone caerphilly gouda cheeseburger cheddar.\n\nCheese and biscuits cheesy grin roquefort. Ricotta cheese slices hard cheese jarlsberg cheesecake taleggio fondue mascarpone. Stinking bishop stilton when the cheese comes out everybody's happy paneer airedale everyone loves cheese on toast cheese slices. Ricotta cut the cheese cheese triangles babybel cream cheese ricotta.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}
				function getHeaders() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings();
				}				async function Content() {
					const { layout, ...content } = frontmatter$1;
					content.file = file;
					content.url = url;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$Project, {
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	frontmatter: frontmatter$1,
	file,
	url,
	rawContent,
	compiledContent,
	getHeadings,
	getHeaders,
	Content,
	default: Content
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/about.astro", { modules: [{ module: $$module1, specifier: "../components/MainHead.astro", assert: {} }, { module: $$module2, specifier: "../components/Footer/index.jsx", assert: {} }, { module: $$module3, specifier: "../components/Nav/index.jsx", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$1 = createAstro("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/about.astro", "", "file:///C:/Users/HP/my-portfolio/my-portfolio/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html lang="en" class="astro-GGZ6YZ7V">
	<head>
		${renderComponent($$result, "MainHead", $$MainHead, { "title": "About | Por", "description": "About Jeanine White Lorem Ipsum", "class": "astro-GGZ6YZ7V" })}
		
	${renderHead($$result)}</head>
	<body class="astro-GGZ6YZ7V">
		${renderComponent($$result, "Nav", Nav, { "class": "astro-GGZ6YZ7V" })}
		<div class="wrapper astro-GGZ6YZ7V">
			<h1 class="astro-GGZ6YZ7V">About Me</h1>
			<div class="heroImg astro-GGZ6YZ7V">
				<img width="1400" height="350" src="https://static.vecteezy.com/system/resources/previews/000/094/726/original/shiny-stars-blue-background-vector.jpg" class="astro-GGZ6YZ7V">
			</div>
			<div class="bio wrapper wrapper__readable mt8 astro-GGZ6YZ7V">
				<p class="astro-GGZ6YZ7V">Hi there, I'm Por</p>
				<p class="astro-GGZ6YZ7V">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am a highly analytical
					individual with a systematic thinking process who eagers to
					learn new things. With background in mathematics,
					statistics, and data analysis, I would like to apply my
					background knowledge to pursue my career as a Software
					Developer.
				</p>
			</div>
		</div>
		${renderComponent($$result, "Footer", Footer, { "class": "astro-GGZ6YZ7V" })}
	</body></html>`;
});

const $$file$1 = "C:/Users/HP/my-portfolio/my-portfolio/src/pages/about.astro";
const $$url$1 = "/about";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$1,
	default: $$About,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/404.astro", { modules: [{ module: $$module1, specifier: "../components/MainHead.astro", assert: {} }, { module: $$module2, specifier: "../components/Footer/index.jsx", assert: {} }, { module: $$module3, specifier: "../components/Nav/index.jsx", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/@fs/C:/Users/HP/my-portfolio/my-portfolio/src/pages/404.astro", "", "file:///C:/Users/HP/my-portfolio/my-portfolio/");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`<html lang="en">
	<head>
		${renderComponent($$result, "MainHead", $$MainHead, { "title": "Not Found" })}
	${renderHead($$result)}</head>
	<body>
		<nav></nav>
		<div class="wrapper mt4 mb4">
			<h1>Page Not Found</h1>
			<p>Not found</p>
		</div>
		<footer></footer>
	</body></html>`;
});

const $$file = "C:/Users/HP/my-portfolio/my-portfolio/src/pages/404.astro";
const $$url = "/404";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/projects.astro', _page1],['src/pages/project/find-your-hat.md', _page2],['src/pages/project/nested/lunar-eclipse.md', _page3],['src/pages/about.astro', _page4],['src/pages/404.astro', _page5],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/preact","clientEntrypoint":"@astrojs/preact/client.js","serverEntrypoint":"@astrojs/preact/server.js","jsxImportSource":"preact"}, { ssr: _renderer1 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":["assets/project-find-your-hat-index-project-nested-lunar-eclipse-404-about.8555e76a.css","assets/project-find-your-hat-index-project-nested-lunar-eclipse.6c3cc81b.css","assets/index.06095f43.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/projects","type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/project-find-your-hat-index-project-nested-lunar-eclipse-404-about.8555e76a.css","assets/project-find-your-hat-index-project-nested-lunar-eclipse.6c3cc81b.css"],"scripts":[],"routeData":{"route":"/project/find-your-hat","type":"page","pattern":"^\\/project\\/find-your-hat\\/?$","segments":[[{"content":"project","dynamic":false,"spread":false}],[{"content":"find-your-hat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/project/find-your-hat.md","pathname":"/project/find-your-hat","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/project-find-your-hat-index-project-nested-lunar-eclipse-404-about.8555e76a.css","assets/project-find-your-hat-index-project-nested-lunar-eclipse.6c3cc81b.css"],"scripts":[],"routeData":{"route":"/project/nested/lunar-eclipse","type":"page","pattern":"^\\/project\\/nested\\/lunar-eclipse\\/?$","segments":[[{"content":"project","dynamic":false,"spread":false}],[{"content":"nested","dynamic":false,"spread":false}],[{"content":"lunar-eclipse","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/project/nested/lunar-eclipse.md","pathname":"/project/nested/lunar-eclipse","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/project-find-your-hat-index-project-nested-lunar-eclipse-404-about.8555e76a.css","assets/about.4732564d.css"],"scripts":[],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/project-find-your-hat-index-project-nested-lunar-eclipse-404-about.8555e76a.css"],"scripts":[],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.js","@astrojs/preact/client.js":"client.0cca1885.js","astro:scripts/before-hydration.js":"data:text/javascript;charset=utf-8,//[no before-hydration script]"},"assets":["/assets/about.4732564d.css","/assets/index.06095f43.css","/assets/project-find-your-hat-index-project-nested-lunar-eclipse.6c3cc81b.css","/assets/project-find-your-hat-index-project-nested-lunar-eclipse-404-about.8555e76a.css","/client.0cca1885.js","/favicon.ico","/assets/mesh-gradient.jpg"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = undefined;

const _exports = adapter.createExports(_manifest, _args);
const _default = _exports['default'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { _default as default };
