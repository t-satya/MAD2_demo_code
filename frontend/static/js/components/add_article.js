const AddArticle = Vue.component("add-article",{
    data:function(){
        return{
            title:"",
            content:"",
        }
    },
    template:`
    <div>
            <h1>You are in the Admin Profile Page</h1>
            <h2>Add Product Page</h2>
            <form @submit.prevent="add_article">
                <div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" v-model="title" required>
                </div>
                <div>
                    <label for="content">Content:</label>
                    <input type="text" id="content" v-model="content" required>
                </div>
            <button type="submit">Submit</button>
            </form>
    </div>
    
    `,
    
    methods:{
        add_article:function(){
            fetch("http://localhost:3000/api/articles",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authentication-Token":localStorage.getItem("token")
                },
                body:JSON.stringify({
                    title:this.title,
                    content:this.content,
                })
            })
            .then((response)=>{
                if(response.ok){
                    console.log(response);
                    console.log(response.json());
                    alert("Article added successfully")
                    this.$router.push("/adminprof");
                }else{
                    throw new Error("Request Failed");
                }
            })
            .catch((error)=>console.error(error))
        }
    }
    })

export default AddArticle