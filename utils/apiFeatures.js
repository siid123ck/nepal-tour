
class APIFeature {
    constructor(query, queryString){
        this.query = query;
        this.queryString=queryString;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el=>delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ni)\b/g, match=>`$${match}`)
        console.log(JSON.parse(queryStr))
         this.query=  this.query.find(JSON.parse(queryStr)) 
         return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }
        return this;
    }

    limit(){
        if(this.queryString.limit){
            this.query = this.query.limit(parseInt(this.queryString.limit))
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields){
            const fieldsLimited = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fieldsLimited)
        } 
        else this.query = this.query.select("-__v")
        return this;
    }

    paginate(){
        if(this.queryString.page){
            const page= this.queryString.page*1 || 1;
            const limit = this.queryString.limit*1 || 10;
            const skip = (page-1) * limit;
            this.query = this.query.skip(skip).limit(limit);
        }
        return this;
    }

    
}

module.exports = APIFeature;