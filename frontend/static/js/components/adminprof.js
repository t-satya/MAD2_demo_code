import AddArticle from "./add_article.js";
import AllArticles from "./all_articles.js";


const AdminProfile= Vue.component("profile",{
    
    components:{
        "all-articles":AllArticles,
        "add-article":AddArticle
    },
    template:`
    <div>
        <h1>You are in the Admin Profile Page</h1>
        <button @click="logout">Logout</button>
        <router-link to="/adminprof">All Articles</router-link>
        <router-link to="/adminprof/addarticle">Add Article</router-link>
        <router-view></router-view>
    </div>
    `,
    methods:{
        logout:function(){
            localStorage.clear();
            this.$router.push("/")
        }
    },
    
    
});

export default AdminProfile;