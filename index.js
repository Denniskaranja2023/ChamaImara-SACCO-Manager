
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
   //const share=document.createElement('p #share')
   //styles for the elements
   h4.style.textAlign= "center";
   h4.style.marginBottom= '2%';
   image.style.height="200px";
   image.style.width="200px";
   image.style.border="1px solid black";
   image.style.borderRadius="50%";
   //assignment of member object values
   h4.textContent= member.name;
   image.src= member.image;
   investment.textContent= `Current Investment:ksh ${member.currentInvestment}`
   debt.textContent=`Current Debt:ksh ${member.currentDebts}`
   //share.textContent=
   //append elements to the container
   container.appendChild(h4);
   container.appendChild(image);
   container.appendChild(investment);
   container.appendChild(debt);
   //append container to the member detail div
   const memberSummary= document.getElementById('memberSummary')
   memberSummary.appendChild(container)
  }








})