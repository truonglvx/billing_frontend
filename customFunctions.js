/**
 * Created by mnace on 10.04.2019.
 */

import i18next from 'i18next';
var mk_translations_doc=require('./docs/mk.json');
var en_translations_doc=require('./docs/en.json');

var translatorInstance = (function () {
    var instance;
 
    async function createInstance() {
        var object=i18next.createInstance();
        await i18next.init({
          lng: 'en',
          debug: true,
          resources: {
            "en": {
              translation: en_translations_doc
            },
            "mk": {
              translation: mk_translations_doc

            }}}).then(function(){
            }).then(function(){});
        console.log('i18next Object', object);
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },

        setLanguage: function(lng){
            i18next.changeLanguage(lng);
        },

        translate: function(key, lng){
            i18next.changeLanguage(lng);
            var value=i18next.t(key);
            return value;
        }
    };
})();

module.exports = {

translatorInstance,

getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
},

getSubscriptionStatusAndProgress(subscription){
            var subscription_status='';
            if(subscription.meta.hasOwnProperty('default_data')){
                subscription_status=subscription.meta.default_data.status;
                if(!subscription.meta.default_data.hasOwnProperty('status')){
                    subscription_status='Completed';
                }
            }
            else{
                subscription_status='Completed';
            }
        
        var subscription_progress=this.getSubscriptionProgress(subscription_status);
        return {"subscription_status": subscription_status, "subscription_progress":  subscription_progress};
},

getSubscriptionProgress(subscription_status){
    var progress_dictionary={"Completed": "100", "Created": "50", "Initialized": "0"};
    return progress_dictionary[subscription_status];
},

logging(){
    console.log('Poraka');
},

uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
},

bytesToSize(bytes, seperator = "") {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes}${seperator}${sizes[i]}`
  return `${(bytes / (1024 ** i)).toFixed(1)}${seperator}${sizes[i]}`
}

}