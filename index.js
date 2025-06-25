

document.addEventListener('DOMContentLoaded',()=>{ 
  //Functions for the Chama Agrregate values

  //A function for rendering the total investment of the Chama
   function totalInvestment() {
    fetch("http://localhost:3000/members").then(res=>res.json()).then(members=> {console.log(members); 
      const total= members.reduce(investmentReducer,0)
      const investmentValue= document.createElement('p')
      investmentValue.textContent=`ksh ${total}`
      investmentValue.style.color="blue"
      investmentValue.id="investmentValue"
      const investmentDiv=document.querySelector('#totalInvestment')
      investmentDiv.appendChild(investmentValue)   
   }).catch(error=> console.error('There is an error', error))}

  //reducer function for current Investments
  function investmentReducer(accumulator,member){
     let currentInvestment= member.currentInvestment
     return accumulator+= currentInvestment
  }
  //execute the totalinvestment function
  totalInvestment();

  //A function for rendering the total Debt of the Chama
  function totalDebt() {
    fetch("http://localhost:3000/members").then(res=>res.json()).then(members=> { 
      const total= members.reduce(debtReducer,0)
      const debtValue= document.createElement('p')
      debtValue.textContent=`ksh ${total}`
      debtValue.style.color="blue"
      debtValue.id="debtValue"
      const debtDiv=document.querySelector('#totalDebt')
      debtDiv.appendChild(debtValue)   
   }).catch(error=> console.error('There is an error', error))}

  //reducer function for current Debts
  function debtReducer(accumulator,member){
     let currentDebt= member.currentDebts
     return accumulator+= currentDebt
  }
  //execute the total Debt function
  totalDebt();

  //A function for rendering the total actual Interests of the chama
  function totalActualInterests() {
    fetch("http://localhost:3000/members").then(res=>res.json()).then(members=> { 
      const total= members.reduce(actualInterestReducer,0)
      const actualInterestValue= document.createElement('p')
      actualInterestValue.textContent=`ksh ${total}`
      actualInterestValue.style.color="blue"
      actualInterestValue.id="actualInterestValue"
      const actualInterestDiv=document.querySelector('#actualInterests')
      actualInterestDiv.appendChild(actualInterestValue)   
   }).catch(error=> console.error('There is an error', error))}

  //reducer function for current Actual Interests
  function actualInterestReducer(accumulator,member){
     let dividends= member.dividends
     return accumulator+= dividends
  }
  //execute the function totalActualInterests
  totalActualInterests();

  //A functiom to render members onto the summary div 
  function renderMembers() {
     fetch("http://localhost:3000/members").then(res=>res.json()).then(members=> members.forEach(member=>createDisplay(member))).catch(error=>console.error('Could not load:', error))
    }
  //creates display of each member to be rendered on the summary div
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
   //add an eventListener to remove a member
   deleteButton.addEventListener('click', (e)=> {
     const containerDiv= e.target.closest(".container")
     const memberId= containerDiv.id;
     const confirmDelete =confirm("Do you want to remove member?")
     if(!confirmDelete) return;
     fetch(`http://localhost:3000/members/${memberId}`, {method:'DELETE'}).then(res=> {if (!res.ok) throw new Error("Delete failed");
      containerDiv.remove();}).catch(error=>console.error("Error:",error))
   })
  //add an eventListener to edit a member's details
  editButton.addEventListener("click",(e)=>{
    const targetDiv= e.target.closest('.container')
    const memberId= targetDiv.id
    fetch(`http://localhost:3000/members/${memberId}`).then(res=>res.json()).then(member=>{renderDetails(member)})
  })
  }
//execute the render function
renderMembers();
//function to render the details of a member on the details div
function renderDetails(member){
  const memberDetails= document.querySelector('#memberDetails')
      memberDetails.style.display= "flex"
      memberDetails.style.flexDirection="column"
      memberDetails.style.justifyContent="space-evenly"
      memberDetails.style.alignItems="center"


  //Clears any previous entry
      memberDetails.innerHTML=""
  //create elements to render details on member details
      const mainContainer= document.createElement("div")
      mainContainer.id= member.id
      mainContainer.className="detailView"
      const name= document.createElement('h3')
      const image= document.createElement('img')
      image.style.height="200px";
      image.style.width="200px";
      image.style.borderRadius="50%";
      //create elements for investment div
      const investmentDiv= document.createElement('div')
        const currentInvestment=document.createElement('p')
        const newInvestmentForm= document.createElement('form')
          const newInvestment=document.createElement('input')
          const investLabel= document.createElement("label")
            newInvestment.type="number"
            newInvestment.name="investment"
            newInvestment.placeholder="10000"
            newInvestment.id="investment"
          const newInvestmentSubmit=document.createElement('input')
            newInvestmentSubmit.type="submit"
      //create the elements for debt div
      const debtDiv= document.createElement('div')
        const currentDebt=document.createElement('p')
        const amountBorrowedForm= document.createElement('form')
        const debtLabel=document.createElement('label')
          const amountBorrowed=document.createElement('input')
            amountBorrowed.type="number"
            amountBorrowed.name="borrowed"
            amountBorrowed.placeholder="10000"
            amountBorrowed.id="borrowed"
          const amountBorrowedSubmit=document.createElement('input')
            amountBorrowedSubmit.type="submit"
      //create the elements for repayment form
      const repaymentForm= document.createElement('form')
          const repayment=document.createElement('input')
          const repaymentLabel=document.createElement('label')
            repayment.type="number"
            repayment.name="repayment"
            repayment.placeholder="10000"
            repayment.id= "repayment"
          const repaymentSubmit=document.createElement('input')
            repaymentSubmit.type="submit"
      const expectedInterests= document.createElement('p')
     //create a cancel button
     const cancelButton= document.createElement('button')
     cancelButton.textContent="Cancel"
     cancelButton.className="buttons"
     //assign values from member data:
     currentInvestment.innerHTML=`<strong>Current Investment</strong>: ksh${member.currentInvestment}`
     currentDebt.innerHTML=`<strong>Current Debt</strong>: ksh${member.currentDebts}`
     expectedInterests.innerHTML=`<strong>Total expected interests:</strong>`
     name.textContent= member.name
     image.src=member.image
     investLabel.textContent="New Investment"
     investLabel.htmlFor="investment"
     debtLabel.textContent="Amount Borrowed"
     debtLabel.htmlFor="borrowed"
     repaymentLabel.textContent="Amount repayed"
     repaymentLabel.htmlFor="repayment"
     //appending the investment elements
      investmentDiv.appendChild(currentInvestment)
      newInvestmentForm.appendChild(investLabel)
      newInvestmentForm.appendChild(newInvestment)
      newInvestmentForm.appendChild(newInvestmentSubmit)
      investmentDiv.appendChild(newInvestmentForm)
     //append the debt elements
      debtDiv.appendChild(currentDebt)
      amountBorrowedForm.appendChild(debtLabel)
      amountBorrowedForm.appendChild(amountBorrowed)
      amountBorrowedForm.appendChild(amountBorrowedSubmit)
      debtDiv.appendChild(amountBorrowedForm)
    //append the repayment elements
      repaymentForm.appendChild(repaymentLabel)
      repaymentForm.appendChild(repayment)
      repaymentForm.appendChild(repaymentSubmit)
    //append all major divs to container
    mainContainer.appendChild(name)
    mainContainer.appendChild(image)
    mainContainer.appendChild(investmentDiv)
    mainContainer.appendChild(debtDiv)
    mainContainer.appendChild(expectedInterests)
    mainContainer.appendChild(repaymentForm)
    mainContainer.appendChild(cancelButton)
    //append the container to the member details div
    memberDetails.appendChild(mainContainer)
    }

})