import mongoose from "mongoose";

export default class Repository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const doc = new this.model(data);
        return await doc.save();
    }

    async findByIdAndUpdate(id, updateData) {
        return await this.model.findByIdAndUpdate(id, updateData, { new: true });
    }

    async findByIdAndDelete(id) {
        return await this.model.findByIdAndDelete(id);
    }
    
    async findOne(query) {
        return await this.model.findOne(query);
    }
    
    async find(query, projection) {
        return await this.model.find(query, projection);
    }
    
    async countDocuments(query) {
        return await this.model.countDocuments(query);
    }
    
    async aggregate(pipeline) {
        return await this.model.aggregate(pipeline);
    }
    
    async findByIds(ids) {
        return await this.model.find({ _id: { $in: ids } });
    }
    
    async distinct(field, query) {
        return await this.model.distinct(field, query);
    }
    
    async updateMany(query, updateData) {
        return await this.model.updateMany(query, updateData);
    }
    
    async updateOne(query, updateData) {
        return await this.model.updateOne(query, updateData);
    }
    
    async deleteMany(query) {
        return await this.model.deleteMany(query);
    }
    
    async deleteOne(query) {
        return await this.model.deleteOne(query);
    }
    
    async findOneAndUpdate(query, updateData, options) {
        return await this.model.findOneAndUpdate(query, updateData, options);
    }
    
    async findByIdAndRemove(id) {
        return await this.model.findByIdAndRemove(id);
    }
    
    async findOneAndDelete(query) {
        return await this.model.findOneAndDelete(query);
    }
}