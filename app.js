const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const toast = (message) => {
  const el = $("#toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(window.__dndToast); window.__dndToast = setTimeout(()=>el.classList.remove("show"), 2600);
};
const viewMeta = {
  home:["Your people. Your pulse.","A little inspiration, a little conversation, a lot of possibility."],
  discover:["Discover what moves you.","Find creators, ideas, communities, and conversations worth your time."],
  shorts:["Short videos. Fresh perspectives.","A dedicated home for quick stories, useful ideas, and creative moments."],
  communities:["Find your people.","Communities for shared interests, honest questions, and ideas in progress."],
  messages:["Good things start with hello.","A preview of the future DND inbox."],
  live:["Bring your people into the moment.","Host a conversation, share a skill, or bring your community together."],
  market:["Discover. Trade. Create value.","A place for creators and communities to showcase goods and services."],
  studio:["Your creativity, with a plan.","One home for your publishing workflow and future performance insights."],
  create:["Put your idea into the world.","Start with a thought. Your next great post doesn't need to be perfect."],
  settings:["Settings & controls.","Important controls for the future account experience."]
};
function showView(name) {
  if (!viewMeta[name]) name="home";
  $$(".view").forEach(v=>v.classList.toggle("active",v.id===`view-${name}`));
  $$("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
  $("#pageTitle").textContent=viewMeta[name][0];
  $("#pageSubtitle").textContent=viewMeta[name][1];
  window.scrollTo({top:0,behavior:"smooth"});
}
$$("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
let posts=0, likes=0;
function refreshMetrics(){
  const base=$("#feedList").querySelectorAll(".post-card").length;
  $("#metricPosts").textContent=String(base);
  $("#metricLikes").textContent=String(likes);
}
function makePost(text) {
  const article=document.createElement("article"); article.className="post-card";
  const head=document.createElement("div"); head.className="post-head";
  const avatar=document.createElement("span"); avatar.className="avatar avatar-you"; avatar.textContent="D";
  const author=document.createElement("div"); author.className="post-author";
  const strong=document.createElement("strong"); strong.textContent="Demo Creator";
  const small=document.createElement("small"); small.textContent="@yourhandle · just now";
  author.append(strong,small);
  const more=document.createElement("button"); more.className="more-btn"; more.textContent="•••"; more.setAttribute("aria-label","More options");
  head.append(avatar,author,more);
  const p=document.createElement("p"); p.className="post-text"; p.textContent=text;
  const stats=document.createElement("div"); stats.className="post-stats"; stats.innerHTML="<span>♡ 0 reactions</span><span>0 replies · 0 shares</span>";
  const actions=document.createElement("div"); actions.className="post-actions";
  actions.innerHTML='<button class="action-btn like-btn">♡ <span>Like</span></button><button class="action-btn comment-btn">◯ <span>Comment</span></button><button class="action-btn share-btn">↗ <span>Share</span></button><button class="action-btn save-btn">◇ <span>Save</span></button>';
  article.append(head,p,stats,actions); return article;
}
function publish(text) {
  const clean=text.trim(); if(!clean){toast("Write something first.");return false;}
  $("#feedList").prepend(makePost(clean)); posts++; refreshMetrics(); toast("Posted to this browser's preview."); return true;
}
$("#postForm").addEventListener("submit",e=>{e.preventDefault();const input=$("#postInput");if(publish(input.value)){input.value="";}});
$("#createForm").addEventListener("submit",e=>{e.preventDefault();if(publish($("#createText").value)){ $("#createText").value="";$("#charCount").textContent="0 / 500";showView("home");}});
$("#createText").addEventListener("input",e=>$("#charCount").textContent=`${e.target.value.length} / 500`);
document.addEventListener("click",e=>{
  const like=e.target.closest(".like-btn");
  if(like){like.classList.toggle("liked");const active=like.classList.contains("liked");like.innerHTML=(active?"♥":"♡")+' <span>'+(active?"Liked":"Like")+'</span>';likes=Math.max(0,likes+(active?1:-1));refreshMetrics();return;}
  const save=e.target.closest(".save-btn");
  if(save){save.classList.toggle("saved");save.innerHTML=(save.classList.contains("saved")?"◆":"◇")+' <span>'+(save.classList.contains("saved")?"Saved":"Save")+'</span>';toast(save.classList.contains("saved")?"Saved in this preview.":"Removed from saved preview.");return;}
  const comment=e.target.closest(".comment-btn"); if(comment){toast("Comments need a connected account and backend.");return;}
  const share=e.target.closest(".share-btn"); if(share){if(navigator.share){navigator.share({title:"DND Social",text:"Check out this DND Social preview."}).catch(()=>{});}else{toast("Sharing will be connected in a later version.");}return;}
  const follow=e.target.closest(".follow-btn");if(follow){const on=follow.classList.toggle("following");follow.textContent=on?"Following":"Follow";toast(on?"Followed in this preview.":"Unfollowed in this preview.");return;}
  const join=e.target.closest(".join-btn");if(join){const on=join.classList.toggle("following");join.textContent=on?"Joined":"Join circle";toast(on?"Joined in this local preview.":"Left this local preview.");return;}
  const feed=e.target.closest(".feed-tab");if(feed){$$(".feed-tab").forEach(b=>b.classList.toggle("active",b===feed));if(feed.dataset.feed!=="for-you")toast("Feed sorting needs a real user graph and backend.");return;}
  const type=e.target.closest(".type-choice");if(type){$$(".type-choice").forEach(b=>b.classList.toggle("active",b===type));if(type.dataset.type!=="text")toast(`${type.dataset.type} publishing is a planned feature.`);return;}
  const topic=e.target.closest(".topic-pills button");if(topic){topic.parentElement.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===topic));toast("Topic selection preview only.");return;}
  const compose=e.target.closest("[data-compose]");if(compose){toast(`${compose.dataset.compose} uploads are not connected yet.`);return;}
});
$("#globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){const q=e.target.value.trim();if(!q)return;showView("discover");toast(`Search for “${q}” is a preview; live search needs a backend.`);}});
$("#notifyBtn").addEventListener("click",()=>toast("Notifications will appear here when accounts are connected."));
$("#profileSwitch").addEventListener("click",()=>toast("Profile editing and sign-in are planned backend features."));
$("#addStory").addEventListener("click",()=>toast("Stories and media upload are planned features."));
$("#filterBtn").addEventListener("click",()=>toast("Feed filters will be available after account and content systems are connected."));
$("#liveNotify").addEventListener("click",()=>{ $("#liveFeedback").textContent="Saved as a local preview preference only.";toast("Live streaming is not active yet.");});
$("#sellBtn").addEventListener("click",()=>toast("Seller listings and checkout need backend and payment integration."));
refreshMetrics();
