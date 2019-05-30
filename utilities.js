var Minio = require('minio');
var customFunctions = require('./customFunctions');
var minioConfig = require('./minio_config.json')

module.exports = {
	getMinioClient(){
        var me=this;
        var minioClient = new Minio.Client({
            endPoint: minioConfig.endPoint,
            port: minioConfig.port,
            useSSL: minioConfig.useSSL,
            accessKey: minioConfig.accessKey,
            secretKey: minioConfig.secretKey
        });

        return minioClient;
    },

    async createBucket(){
    	var uuidv4=customFunctions.uuidv4();
        var bucket_name= minioConfig.bucketPrefix + uuidv4;

        var minioClient = this.getMinioClient();
        // Make a bucket uuidv4.
        var response_make_bucket=await minioClient.makeBucket(bucket_name, 'us-east-1').then(function(){
            return bucket_name;
        });

        console.log('Bucket created successfully in "us-east-1": ', bucket_name);
        return bucket_name;
    },

    async addFilesToBucket(fileUploads, response_make_bucket){
    	var minioClient = this.getMinioClient();

    	var file_objects = [];
    	var number_of_uploaded_files=0;
    	
        for(var i = 0; i < fileUploads.length; i++){
            file_objects.push(fileUploads[i]);
            console.log('Calling buffer with ', file_objects[i]);
            var buffer = await new Response(file_objects[i]).arrayBuffer().then(function(arrBuffer){
                return new Buffer(arrBuffer);
            });

            var file_name = file_objects[i].name;
            console.log('Calling pubObject with ', response_make_bucket, file_name, buffer);
            var response_put_object = await minioClient.putObject(response_make_bucket, file_name, buffer).then(function(etag){
                number_of_uploaded_files++;
                return `File uploaded successfully ${file_name}`;
            }).catch(function(err){
                return err;
            });
            console.log(response_put_object);
        }

        return number_of_uploaded_files;
    }
}