import Login from "./components/login.js";
import Profile from "./components/profile.js";
import Signup from "./components/signup.js";
import AdminProfile from "./components/adminprof.js";
import AddArticle from "./components/add_article.js";
import AllArticles from "./components/all_articles.js";

const routes = [
    {path:'/', component:Login},
    {path:"/profile",component:Profile},
    {path:'/signup',component:Signup},
    {path:"/adminprof",
    component:AdminProfile,
    children:[
    {path:"addarticle",component:AddArticle},
    {path:"",component:AllArticles}
    ],
}
];

const router = new VueRouter({
    routes
});

const a = new Vue({
    el : "#app",
    router
});