//Nest checkboxes with jQyery
function checkBoxComJQuery() {


$('input[type="checkbox"]').change(function(e) {    
      
    var checked = $(this).prop("checked"),
        container = $(this).parent(),
        siblings = container.siblings();
  
    container.find('input[type="checkbox"]').prop({
        indeterminate: false,
        checked: checked
    });

    function checkSiblings(el) {

        var parent = el.parent().parent(),
            all= true;

        el.siblings().each(function() {
            let returnValue = all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
            return returnValue;
        });

        if (all && checked) {
            parent.children('input[type="checkbox"]').prop({
                indeterminate: false,
                checked: checked
            });

            checkSiblings(parent);
            
        } else if (all && !checked) {
            parent.children('input[type="checked"]').prop("checked", checked);
            parent.children('input[type="checkbox"]').prop("indeterminate",(parent.find('input[type="checkbox"]:checked').length > 0));
            checkSiblings(parent);
        } else {
            el.parents("li").children('input[type="checkbox"]').prop({
                indeterminate: true,
                checked: false
            });
        }
    }

    checkSiblings(container);

  });

}

//Nest checkboxes with pure JS
function checkJSPuro() {    
    //helper function to create nodeArrays (not collections)
    const nodeArray = (selector, parent=document) => [].slice.call(parent.querySelectorAll(selector));    

    //checkboxes of interest
    const allThings = nodeArray('input');

    //global listener
    addEventListener('change', e => {
        let check = e.target;

        //exit if change event did not come from our list of allThings
        if (allThings.indexOf(check) === -1) return;

        //check/uncheck children (includes check itself)
        const children = nodeArray('input', check.parentNode);
        children.forEach(child => child.checked = check.checked);

        //traverse up from target check
        while(check) {

            //find parent and sibling checkboxes (quick 'n'dirty)
            const parent = (check.closest(['ul']).parentNode).querySelector('input');
            const siblings = nodeArray('input', parent.closest('li').querySelector(['ul']));

            //get checked state of simblings
            //are every or some siblings checked (using Boolean as test function)
            const checkStatus = siblings.map(check => check.checked);
            const every = checkStatus.every(Boolean);
            const some = checkStatus.some(Boolean);

            //check parent if all siblings are checked
            //set indeterminate if not all and not none are checked
            parent.checked = every;
            parent.indeterminate = !every && every !== some;

            //prepare for next loop
            check = check != parent ? parent : 0;
        }
    })
}


//All credits goes to CSSTricks and its sources
//https://css-tricks.com/indeterminate-checkboxes/


function itemsAccordeon() {
    var allSpan = document.getElementsByTagName('span');

    for(var x = 0; x < allSpan.length; x++)
    {
        //verifica se o elemento possui nós filhos. Caso contrário, não exibe o span e não inclui evento de onClick                 
        if (!allSpan[x].parentNode.getElementsByTagName('LI').length > 0) {
            allSpan[x].style.display="none"            
        }
        allSpan[x].onclick=function()
        {
            console.log("ok");
            if(this.parentNode)            
            {
                var childList = this.parentNode.getElementsByTagName('LI');
                for(var y = 0; y< childList.length;y++)                
                {
                    var currentState = childList[y].style.display;
                    if(currentState=="none")
                    {
                        childList[y].style.display="block";
                        this.innerHTML = "arrow_drop_down";
                    }
                    else
                    {
                        childList[y].style.display="none";
                        this.innerHTML = "arrow_right";
                    }
                }
            }
        }            
    }
}
