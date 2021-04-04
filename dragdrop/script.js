const draggables = document.querySelectorAll( '.draggable' );
const containers = document.querySelectorAll( '.container' );

draggables.forEach(( draggable => {

    draggable.addEventListener( 'dragstart', () => {
        draggable.classList.add( 'dragging' );
    })

    draggable.addEventListener( 'dragend', () => {
        draggable.classList.remove( 'dragging' );
    })

}))

containers.forEach( container => {

    container.addEventListener( 'dragover', e=>{

        e.preventDefault(); //by default dragging in a element is disabled.

        const draggable = document.querySelector( ".dragging" );

        const afterElement = getDragAfterElement( container, e.clientY );

        if( afterElement )
        {
            container.insertBefore( draggable, afterElement)
        }
        else
        {
            container.appendChild( draggable );
        }
        
    })
})

function getDragAfterElement( container, cursorPositionY )
{
    const draggableElements = [ ...container.querySelectorAll('.draggable:not(.dragging)') ];

    return draggableElements.reduce( ( closest, child) => {

        const box = child.getBoundingClientRect();

        const childCenterY=  (box.top+box.height/2);

        const distanceBetweenCursorAndChildCenter = cursorPositionY - childCenterY;

        if( distanceBetweenCursorAndChildCenter < 0 && distanceBetweenCursorAndChildCenter > closest.offset )
        {
            return { offset : distanceBetweenCursorAndChildCenter, element : child  }
        }
        else
        {
            return closest;
        }


    },{ offset : Number.NEGATIVE_INFINITY } ).element
}