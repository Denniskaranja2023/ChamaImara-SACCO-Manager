document.addEventListener('DOMContentLoaded',()=>{
  //A functiom to render members onto the summary div 
  function renderMembers() {
     fetch("http://localhost:3000/members").then(res=>res.json()).then(members=> members.forEach(member=>createDisplay(member))).catch(error=>console.error('Could not load:', error))
    }
    renderMembers();
  
  function createDisplay(member) {
   const container= document.createElement('div')
   //styles of container
   container.id=member.id
   container.className= "container";
   //create relevant Elements for display
   const h4= document.createElement('h4')
   const image=document.createElement('img')
   const investment= document.createElement('p')
   investment.id="invest"
   const debt=document.createElement('p')
   debt.id="debt"
   const dividends=document.createElement('p')
   dividends.id="dividends"
   const buttonDiv= document.createElement('div')
   buttonDiv.className="buttonDiv"
   const deleteButton= document.createElement('button')
   deleteButton.id="remover"
   const editButton=document.createElement('button')
   editButton.id="editer"
   //const share=document.createElement('p #share')
   //styles for the elements
   h4.style.textAlign= "center";
   h4.style.marginBottom= '2%';
   image.style.height="200px";
   image.style.width="200px";
   image.style.border="1px solid black";
   image.style.borderRadius="50%";
   deleteButton.className="buttons"
   editButton.className="buttons"
   //assignment of member object values
   h4.textContent= member.name;
   image.src= member.image;
   investment.innerHTML= `<strong>Current Investment</strong>:ksh ${member.currentInvestment}`
   debt.innerHTML=`<strong>Current Debt</strong>:ksh ${member.currentDebts}`
   dividends.innerHTML=`<strong>Dividends</strong>:ksh ${member.dividends}`
   deleteButton.innerHTML=`Remove <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`
   editButton.innerHTML=`Edit <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`
   //share.textContent=
   //append elements to the container
   buttonDiv.appendChild(deleteButton)
   buttonDiv.appendChild(editButton)
   container.appendChild(h4);
   container.appendChild(image);
   container.appendChild(investment);
   container.appendChild(debt);
   container.appendChild(dividends);
   container.appendChild(buttonDiv);

   //append container to the member detail div
   const memberSummary= document.getElementById('memberSummary')
   memberSummary.appendChild(container)
   //add and eventListener to remove a member
   deleteButton.addEventListener('click', (e)=> {
     const containerDiv= e.target.closest(".container")
     const memberId= containerDiv.id;
     const confirmDelete =confirm("Do you want to remove member?")
     if(!confirmDelete) return;
     fetch(`http://localhost:3000/members/${memberId}`, {method:'DELETE'}).then(res=> {if (!res.ok) throw new Error("Delete failed");
      containerDiv.remove();}).catch(error=>console.error("Error:",error))
   })
  }


})