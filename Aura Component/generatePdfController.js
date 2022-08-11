({
    closeQuickaction: function(component,event,helper) {
            $A.get("e.force:closeQuickAction").fire();
 },   
    savePDF : function(cmp, event, helper) {
          var action = cmp.get("c.savePDFOpportunity");
          action.setParams({"quoteId": cmp.get("v.recordId")});  
          action.setCallback(this, function(response) {
            var state = response.getState(); 
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                 title: "Success!",
                 type: 'success',
                 message: "Attachment saved and Email Send successfully"
                   });
                   toastEvent.fire();
                $A.get("e.force:closeQuickAction").fire();
                $A.get('e.force:refreshView').fire();
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {  
                    var errors = action.getError();
                   if (errors) {
                    if (errors[0] && errors[0].message) {
                       // alert(errors[0].message);
                        var toastEvent = $A.get("e.force:showToast");
                         toastEvent.setParams({
                         title: "Error!",
                         type: 'Error',
                         message: errors[0].message
                   });
                   toastEvent.fire();
                        $A.get("e.force:closeQuickAction").fire();
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    }
 
})
