const mongoose = require("mongoose");
const Articles = mongoose.model("Articles");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class ArticleServices{
    /**
     * @param {ObjectID} ObjectID of articles
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns Articles as per id
     * @async
     * x
     */
    static getByID(id){
        return Articles.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw Error('brak id')
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
            return await Articles.find()
            .then(doc=>{return doc})
            .catch(err=>{throw new AppError('coś nie tak z baza danych', MONGO_ERROR, err)})
        }
        if(id) {
            throw new AppError('ID niepoprawne', MONGO_ERROR)
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
        if (!article) {
            throw new AppError('brak adresu', ARGUMENT_ERROR)
        }
        const Article = new Articles(article);
        return await Article.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            throw new AppError('blad mongodb', MONGO_ERROR, err)
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
        if(!article || !article._id) {
            throw new AppError('brak artykulu do aktualizacji', ARGUMENT_ERROR)
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
            throw new AppError('blad mongodb', MONGO_ERROR, err)      
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
            throw new AppError('nie podales id', ARGUMENT_ERROR)
        }
        try {
            return await Articles.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = ArticleServices






