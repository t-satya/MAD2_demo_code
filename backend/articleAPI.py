from flask_restful import Resource,reqparse
from flask_security import roles_accepted,current_user,auth_required
from models import *
from flask import jsonify

create_article_parser = reqparse.RequestParser()
create_article_parser.add_argument('title')
create_article_parser.add_argument("content")

class ArticleAPI(Resource):
    
    @auth_required("token")
    @roles_accepted("customer","admin")
    def get(self):
        #print(current_user.get_auth_token())
        print(current_user)
        articles = Article.query.all()
        all_articles={}
        for article in articles:
            all_articles[article.article_id]={"article_id":article.article_id,"title":article.title,"content":article.content}
        return jsonify(all_articles)
    
    @auth_required("token")
    @roles_accepted("admin")
    def post(self):
        args = create_article_parser.parse_args()
        art_name = args.get("title")
        art_descr = args.get("content")
        new_art = Article(title=art_name,content=art_descr)
        db.session.add(new_art)
        db.session.commit()
        return jsonify({"message":"article created"})
    
    def put(self):
        pass

    def delete(self):
        pass
