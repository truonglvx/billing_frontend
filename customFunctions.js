/**
 * Created by mnace on 10.04.2019.
 */

module.exports = {

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
}

}