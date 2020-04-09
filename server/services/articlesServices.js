const mongoose = require("mongoose");
const Articles = mongoose.model("Articles");

class ArticleServices{
    /**
     * @param {ObjectID} ObjectID of articles
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns Articles as per id
     * @async
     * x
     */
    static getByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return Articles.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns Articles depends on the given id
     * @async
     * x
     */
    static async getAll(id=null){
        if(!id) {
            return await Articles.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(id) {
            return await this.getByID(id)
        }

    }

    /** 
     * @param {object} article
     * @returns created article data
     * @throws Error if article data not recieved || mongoDB othervise or if article object has no enough data
     * x
     */
    static async create(article) {
        console.log(article);
        if (!article.tytul || !article.tresc) {
            throw new Error("podana FV nie zawiera kompletu informacji")
        }
        const Article = new Articles(article);
        return await Article.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
        throw err
        });
    }


    /**
     * 
     * @param {Object} article 
     * @throws Error if id of the article you want to update not exist or if Provided article object has no id
     * @returns updated article
     * @async
     * x
     */
    static async update(article) {   
        if(!article._id) {
            throw new Error("przekazany objekt invoice nie ma id")
        }
        try{
        const doc = await Articles.findOneAndUpdate(
            { _id: article._id },
            article, {new: true}); 
            return {
                article: doc,
                message: "Updated"
            };
        } 
        catch(err) {
            throw err        
        };
    }


    /**
     * 
     * @param {String} id
     * @throes Error if lack of id or there is no article with provided id 
     * @returns deleted article
     * @async
     * x
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw Error("brak id")
        }
        try {
            return await Articles.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}
        };
    }
}

module.exports = ArticleServices






