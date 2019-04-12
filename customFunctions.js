/**
 * Created by mnace on 10.04.2019.
 */

module.exports = {

getSubscriptionStatusAndProgress(subscription){
            var subscription_status='';
            if(subscription.meta.hasOwnProperty('vm_data')){
                subscription_status='managed_by_ssh';
               

               /* fetch("https://66.155.4.76/api/servers/get_server_data?server_name="+subscriptions[i].meta.novobox_name, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ab60ce81305e475691e5cfceaefefd77',
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    var response_status = myJson;
                    console.log(response_status);
                    subscriptions_status_list.push(response_status.data.launch_status);
                    me.setState({ subscriptions_status: subscriptions_status_list });
                    //console.log('subscriptions_status_list: ', me.state.subscriptions_status);
                    if(subscriptions_status_list.length == subscriptions.length){
                        me.setSubscriptionProgress();
                    }
                });*/
            }
            else{
                subscription_status='managed_by_salt';
            }
        
        var subscription_progress=this.getSubscriptionProgress(subscription_status);
        return {"subscription_status": subscription_status, "subscription_progress":  subscription_progress};
},

getSubscriptionProgress(subscription_status){
    var progress_dictionary={"managed_by_salt": "100", "managed_by_ssh": "66", "created": "33", "not_created": "0"};
    return progress_dictionary[subscription_status];
},

logging(){
    console.log('Poraka');
}

}