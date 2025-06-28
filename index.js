
document.addEventListener('DOMContentLoaded',()=>{ 
  //Functions for the Chama Agrregate values
  const baseURL= `https://chamaimara-server.onrender.com/members`
  //1. A function for rendering the total investment of the Chama
   function totalInvestment() {
    fetch(`${baseURL}`).then(res=>res.json()).then(members=> { 
      const total= members.reduce(investmentReducer,0)
      const investmentValue= document.createElement('p')
      investmentValue.textContent=`ksh ${total}`
      investmentValue.style.color="blue"
      investmentValue.style.textAlign="center"
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

  //2. A function for rendering the total Debt of the Chama
  function totalDebt() {
    fetch(`${baseURL}`).then(res=>res.json()).then(members=> { 
      const total= members.reduce(debtReducer,0)
      const debtValue= document.createElement('p')
      debtValue.textContent=`ksh ${total}`
      debtValue.style.color="blue"
      debtValue.style.textAlign="center"
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

  //3.A function for rendering the total actual Interests of the chama
  function totalActualInterests() {
    fetch(`${baseURL}`).then(res=>res.json()).then(members=> { 
      const total= members.reduce(actualInterestReducer,0)
      const actualInterestValue= document.createElement('p')
      actualInterestValue.textContent=`ksh ${total}`
      actualInterestValue.style.color="blue"
      actualInterestValue.style.textAlign="center"
      actualInterestValue.id="actualInterestValue"
      const actualInterestDiv=document.querySelector('#actualInterests')
      actualInterestDiv.appendChild(actualInterestValue)   
   }).catch(error=> console.error('There is an error', error))}

  //reducer function for current Actual Interests
  function actualInterestReducer(accumulator,member){
     let actualInterestsRepayed= member.InterestsRepayed
     return accumulator+= actualInterestsRepayed
  }
  //execute the function totalActualInterests
  totalActualInterests();
  
  //4. A function for determining the totalExpectedInterests of the Chama
  function totalExpectedInterests() {
    fetch(`${baseURL}`).then(res=>res.json()).then(members=> { 
      const total= members.reduce(expectedInterestReducer,0)
      const expectedInterestValue= document.createElement('p')
      expectedInterestValue.textContent=`ksh ${total}`
      expectedInterestValue.style.color="blue"
      expectedInterestValue.style.textAlign="center"
      expectedInterestValue.id="expectedInterestValue"
      const expectedInterestDiv=document.querySelector('#expectedInterests')
      expectedInterestDiv.appendChild(expectedInterestValue)   
   }).catch(error=> console.error('There is an error', error))}

  //reducer function for current expected Interests
  function expectedInterestReducer(accumulator,member){
     let expectedDividends= member.dividends
     return accumulator+= expectedDividends
  }
  //execute the function totalExpectedInterests
  totalExpectedInterests();

  //5. A function for determining the netValue of the Chama
  function netValue() {
    fetch(`${baseURL}`).then(res=>res.json()).then(members=> { 
      const total= members.reduce(netValueReducer,0)
      const netTotalValue= document.createElement('p')
      netTotalValue.textContent=`ksh ${total}`
      netTotalValue.style.color="blue"
      netTotalValue.style.textAlign="center"
      netTotalValue.id="totalNetValue"
      const netValueDiv=document.querySelector('#netValue')
      netValueDiv.appendChild(netTotalValue)   
   }).catch(error=> console.error('There is an error', error))}

  //reducer function for current Actual Interests
  function netValueReducer(accumulator,member){
     let memberNetValue= (member.currentInvestment-member.currentDebts+member.InterestsRepayed)
     return accumulator+= memberNetValue
  }
  //execute the netValue function
  netValue();



  //A functiom to render members onto the summary div 
  function renderMembers() {
     fetch(`${baseURL}`).then(res=>res.json()).then(members=> members.forEach(member=>createDisplay(member))).catch(error=>console.error('Could not load:', error))
    }
  //function to update sharePercent without having to refresh the page
  function updateAllSharePercentages() {
  return fetch(`${baseURL}`)
    .then(res => res.json())
    .then(members => {
      const totalInvestment = members.reduce((sum, member) => sum + member.currentInvestment, 0);

      const updatePromises = members.map(member => {
        const newSharePercent = ((member.currentInvestment / totalInvestment) * 100);
        return fetch(`${baseURL}/${member.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sharePercent: parseFloat(newSharePercent.toFixed(2))
          })
        });
      });

      return Promise.all(updatePromises); // Resolves when all fetch requests are done
    });
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
   const share=document.createElement('p')
   share.id="share"
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
   share.innerHTML=`<strong>Share value</strong>:${member.sharePercent}%`
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
   container.appendChild(share);
   container.appendChild(buttonDiv);

   //append container to the member detail div
   const memberSummary= document.getElementById('memberSummary')
   memberSummary.appendChild(container)
  
deleteButton.addEventListener('click', async (e) => {
  const containerDiv = e.target.closest(".container");
  const memberId = containerDiv.id 

  const confirmDelete = confirm("Do you want to remove member?");
  if (!confirmDelete) return;

  //Fetch the member's data before deletion
  const memberRes = await fetch(`${baseURL}/${memberId}`);
  const memberToDelete = await memberRes.json();
  //select the currentDebt and interestOnLoan of the member to be deleted and assign them variables
  const interestOnLoan = memberToDelete.interestsOnLoan
  const currentDebt = memberToDelete.currentDebts
  const deletedDividends= memberToDelete.dividends

  //Get all members and filter out the one being deleted
  const allMembersRes = await fetch(`${baseURL}`);
  const allMembers = await allMembersRes.json();
  const remainingMembers = allMembers.filter(member => member.id !== memberId);

  //Calculate total share percent of remaining members
  const totalShare = remainingMembers.reduce((accumulator, member) => {
    return accumulator + (parseFloat(member.sharePercent));
  }, 0);

  // Redistribute exiting member's currentDebt as investment for remaining members and interestOnLoan as Interestrepayments on each member and removes all dividends of deleted member
  for (const member of remainingMembers) {
    const sharePercent = parseFloat(member.sharePercent);
    const shareRatio = sharePercent / totalShare;

    const updatedInterest = (parseFloat(member.InterestsRepayed)) + (interestOnLoan * shareRatio)-(deletedDividends*shareRatio);
    const updatedInvestment = (parseFloat(member.currentInvestment)) + (currentDebt * shareRatio);

    await fetch(`${baseURL}/${member.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentInvestment: Math.round(updatedInvestment),
        InterestsRepayed: Math.round(updatedInterest)
      })
    });
  }

  //Delete the member from server
  await fetch(`${baseURL}/${memberId}`, { method: 'DELETE' });

  //Remove member's container from DOM
  containerDiv.remove();

  // Update share percentages after deletion
  await updateAllSharePercentages();

  // Refresh summaries and member list
  function refresh() {
    // Clear all summary value containers
    ["investmentValue", "debtValue", "actualInterestValue", "expectedInterestValue", "totalNetValue"]
      .forEach(id => document.getElementById(id)?.remove());

    // Re-render values
    totalInvestment();
    totalDebt();
    totalActualInterests();
    totalExpectedInterests();
    netValue();
  }

  refresh();
  document.getElementById("memberDetails").innerHTML="";
  document.getElementById("memberSummary").innerHTML="";
  renderMembers();
  renderSharePieChart();
});

  //add an eventListener to edit a member's details
  editButton.addEventListener("click",(e)=>{
    const targetDiv= e.target.closest('.container')
    const memberId= targetDiv.id
    fetch(`${baseURL}/${memberId}`).then(res=>res.json()).then(member=>{renderDetails(member)})
  })
  }
//execute the render function after updating percentages

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
      image.style.border="1px solid black";
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
      const expectedInterests= document.createElement('div')
     //create a cancel button
     const cancelButton= document.createElement('button')
     cancelButton.textContent="Cancel"
     cancelButton.className="buttons"
     //assign values from member data:
     currentInvestment.innerHTML=`<strong>Current Investment</strong>: ksh${member.currentInvestment}`
     currentDebt.innerHTML=`<strong>Current Debt</strong>: ksh${member.currentDebts}`
     expectedInterests.innerHTML=`<p><strong>Total LoanInterests:</strong></p>`
     expectedInterests.id="expectedInterests"
     expectedInterests.style.display="flex";
     name.textContent= member.name
     image.src=member.image
     investLabel.textContent="New Investment"
     investLabel.htmlFor="investment"
     debtLabel.textContent="Amount Borrowed"
     debtLabel.htmlFor="borrowed"
     repaymentLabel.textContent="Amount repayed"
     repaymentLabel.htmlFor="repayment"
     const expectedInterestValue= document.createElement("p")
     expectedInterestValue.textContent=`ksh${member.interestsOnLoan}`
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
      expectedInterests.appendChild(expectedInterestValue)
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

    //add submit event Listener to newInvestmentsForm
     newInvestmentForm.addEventListener('submit',(e)=>{
      //confirms whether the input value is the desired one
      const confirmed= confirm('Are you sure member is investing this amount?')
      if(!confirmed) {
        e.preventDefault(); 
        return;
      }
      e.preventDefault();                         //prevent an immediate refresh on submission
     const container= e.target.closest('.detailView')
     const memberId=container.id
     //transforms the inputed value into a decimal number value
      const newInvestment= parseFloat(document.getElementById('investment').value)
      fetch(`${baseURL}/${memberId}`).then(res=>res.json()).then(member=>{
          const newCurrentInvestment= (member.currentInvestment+ newInvestment)
        // once newcurrent investment is calculated, send request to update server
        fetch(`${baseURL}/${memberId}`, {
           method: "PATCH",
           headers:{
            "Content-Type":"application/json"
           },
           body: JSON.stringify({currentInvestment:newCurrentInvestment})
        }).then(res=> {
          if(!res.ok) throw new Error('Could not update currentInvestment');
          return res.json()
        }).then((member)=>{ 
          updateAllSharePercentages().then(()=>{  //updates member share percentages first before any other update
          const summaryDiv= document.getElementById("memberSummary")
          summaryDiv.innerHTML=" " //clear summary Div
          renderMembers(); //refresh summary display
          renderSharePieChart();
          const investDisplay= document.getElementById('investmentValue')
          investDisplay.remove() //removes former total display
          totalInvestment();  //calls function to update newinvestment Total
          const netValueDisplay= document.getElementById('totalNetValue')
          netValueDisplay.remove() //removes former netValue
          netValue(); //calls function to update netValue
          newInvestmentForm.reset();
          const memberDetails= document.getElementById("memberDetails")
          memberDetails.innerHTML=" "//clears member detail div
          renderDetails(member);//displays the new investment changes on the details div
        })
        })
      })
    })

     //add submit event Listener to amountBorrowedForm
     amountBorrowedForm.addEventListener('submit',(e)=>{
      //confirms whether the input value is the desired one
      const confirmed= confirm('Are you sure member is borrowing this amount?')
      if(!confirmed) {
        e.preventDefault(); 
        return;
      }
      e.preventDefault();                         //prevent an immediate refresh on submission
     const container= e.target.closest('.detailView')
     const memberId=container.id
     //transforms the inputed value into a decimal number value
      const newAmountBorrowed= parseInt(document.getElementById('borrowed').value)
      fetch(`${baseURL}/${memberId}`).then(res=>res.json()).then(member=>{
        //terminates if member has an outstanding debt
        if(member.currentDebts !==0) {
          alert("Member must first clear outstanding debt")
          return;}
        //terminates if member borrows more than 40% their investments
        else if(newAmountBorrowed> 0.4*member.currentInvestment){
          alert("Member cannot borrow more than 40% of their savings")
          return;
        }
          const newInterestOnLoan=(0.05*newAmountBorrowed)+ member.interestsOnLoan
          const newCurrentDebt= (member.currentDebts+ newAmountBorrowed+(0.05*newAmountBorrowed))
        // once newAmountBorrowed is calculated, send request to update server
        fetch(`${baseURL}/${memberId}`, {
           method: "PATCH",
           headers:{
            "Content-Type":"application/json"
           },
           body: JSON.stringify({
            currentDebts: newCurrentDebt,
            interestsOnLoan: newInterestOnLoan
           })
        }).then(res=> {
          if(!res.ok) throw new Error('Could not update currentDebts');
          return res.json()
        }).then (()=>{
          fetch(`${baseURL}`).then(res=>res.json()).then(members=>{
             //const totalInvestment= members.reduce(investmentReducer,0)
              
             const updateAllPromises= members.map(updatedMember=>{
              const shareOnInterest= ((0.05*newAmountBorrowed)*(updatedMember.sharePercent/100))
              const newDividend= (updatedMember.dividends+ shareOnInterest)

              return fetch(`${baseURL}/${updatedMember.id}`,{
                method:"PATCH",
                headers: {
                  "Content-Type":"application/json"
                },
                body: JSON.stringify({
                  dividends: Math.round(newDividend)
                })
              });
             });
         
          //Ensure all dividends values are updated before any other execution continues
          return Promise.all(updateAllPromises) 
           }).then (()=>{
          const memberDetails= document.getElementById("memberDetails")
          memberDetails.innerHTML=" "//clears member detail div
          fetch(`${baseURL}/${memberId}`)
               .then(res => res.json())
               .then(updatedMember => {
                renderDetails(updatedMember);
               })//displays the new debt changes on the details div
          
          const summaryDiv= document.getElementById("memberSummary")
          summaryDiv.innerHTML=" " //clear summary Div
          renderMembers(); //refresh summary display
          const expectedInterestsDisplay= document.getElementById('expectedInterestValue')
          expectedInterestsDisplay.remove() //removes former expectedInterest
          totalExpectedInterests(); //calls function to update expectedInterest
          const debtDisplay= document.getElementById('debtValue')
          debtDisplay.remove() //removes former total display
          totalDebt();  //calls function to update Debt Total
          const netValueDisplay= document.getElementById('totalNetValue')
          netValueDisplay.remove() //removes former netValue
          netValue(); //calls function to update netValue
          amountBorrowedForm.reset();
        })
      })
    })
     })

    //add submit event Listener to repaymentForm
     repaymentForm.addEventListener('submit',(e)=>{
      //confirms whether the input value is the desired one
      const confirmed= confirm('Are you sure member is repaying this amount?')
      if(!confirmed) {
        e.preventDefault(); 
        return;
      }
      e.preventDefault();                         //prevent an immediate refresh on submission
     const container= e.target.closest('.detailView')
     const memberId=container.id
     //transforms the inputed value into a decimal number value
      const repaymentValue= parseFloat(document.getElementById('repayment').value)
      fetch(`${baseURL}/${memberId}`).then(res=>res.json()).then(member=>{
         let newDebtTotal;
         let newInterestRepayed;
        if(member.currentDebts ===0){return alert("There are no current Debts")}
        if((member.currentDebts-repaymentValue) > 0){
             newDebtTotal= (member.currentDebts- repaymentValue);
            }
          else{
            newDebtTotal=0
            newInterestRepayed= repaymentValue-member.currentDebts+member.interestsOnLoan;
          }
        // once newDebtTotal and newInterestRepayed is calculated, send request to update server
        fetch(`${baseURL}/${memberId}`, {
           method: "PATCH",
           headers:{
            "Content-Type":"application/json"
           },
           body: JSON.stringify({
            currentDebts:newDebtTotal,
            InterestsRepayed: newInterestRepayed || member.InterestsRepayed,
           })
        }).then(res=> {
          if(!res.ok) throw new Error('Could not update currentDebts');
          return res.json()
        }).then((member)=>{ 
          const summaryDiv= document.getElementById("memberSummary")
          summaryDiv.innerHTML=" " //clear summary Div
          renderMembers(); //refresh summary display
          const debtDisplay= document.getElementById('debtValue')
          debtDisplay.remove() //removes former total display
          totalDebt();  //calls function to update Debt Total
          const actualinterestDisplay=document.getElementById("actualInterestValue")
          actualinterestDisplay.remove()//remove former actualInterest display
          totalActualInterests();
          const netValueDisplay= document.getElementById('totalNetValue')
          netValueDisplay.remove() //removes former netValue
          netValue(); //calls function to update netValue
          repaymentForm.reset();
          const memberDetails= document.getElementById("memberDetails")
          memberDetails.innerHTML=" "//clears member detail div
          renderDetails(member);//displays the new debt changes on the details div
        })
      })
    })
    //add event Listner to cancelbutton to remove created container from detail div
    cancelButton.addEventListener('click', (e)=>{
      const container= e.target.closest('.detailView')
       memberDetails.removeChild(container)
    })
    }
    //add Submit event listener to the add new member form
    const newMemberForm= document.querySelector("#newMemberForm")
    newMemberForm.addEventListener('submit',e => {
      e.preventDefault(); //prevents immediate submission of form
      const confirmMessage= confirm("Is this the correct member Data?")
      if(!confirmMessage) return;
      ///select the form inputs data
       const newMemberName= newMemberForm.memberName.value
       const newMemberImage=newMemberForm.image.value
       const newMemberInvestment=newMemberForm.currentInvestment.value
      //send a post request with the new member data
      fetch(`${baseURL}`,{
         method:"POST",
         headers: {"Content-Type":"application/json"},
         body: JSON.stringify({
             name: newMemberName,
             image: newMemberImage,
             currentInvestment: parseInt(newMemberInvestment),
             currentDebts: 0,
             repayments: 0,
             dividends: 0,
             InterestsRepayed: 0,
             interestsOnLoan: 0
         })
      }).then(res=>res.json()).then(()=>
        //update all the parts of the DOM affected by a new investment
         updateAllSharePercentages().then(()=>{
          const summaryDiv= document.getElementById("memberSummary")
          summaryDiv.innerHTML=" " //clear summary Div
          renderMembers();
          const investDisplay= document.getElementById('investmentValue')
          investDisplay.remove() //removes former total display
          totalInvestment();  //calls function to update newinvestment Total
          const netValueDisplay= document.getElementById('totalNetValue')
          netValueDisplay.remove() //removes former netValue
          netValue(); //calls function to update netValue
          renderSharePieChart();
          newMemberForm.reset();//resets form
         }
        ))
    })
  //function for rendering a piechart
  let pieChartInstance = null;

// Generates random rgba colors 
function generateColors(count, alpha = 0.7) {
  return Array.from({ length: count }, () => {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  });
}

async function renderSharePieChart() {
  await updateAllSharePercentages();
  //fetch members from server
  const res = await fetch(`${baseURL}`);
  const members = await res.json();
  //sets labels as member names and data as percentages
  const labels = members.map(member => member.name);
  const data = members.map(member => parseFloat(member.sharePercent)); //creates a new array of all members
  //gets the chart from DOM
  const canvas = document.getElementById('sharePieChart');
  if (!canvas) return console.warn('Pie chart canvas not found.');
  const ctx = canvas.getContext('2d');
  //removes any existing pie chart
  if (pieChartInstance) {
    pieChartInstance.destroy();
  }
  //creates a new chart
  pieChartInstance = new Chart(ctx, {
    type: 'pie',                             //type of chart
    data: {                                  //defines the data
    labels: labels,
    datasets: [{
    label: 'Share Percent',
    data: data,
    backgroundColor: generateColors(data.length),  
    borderWidth: 1
      }]
    },
    options: {                              //extra options
    responsive: true,                      //makes the pie chart responsive
    plugins: {
        legend: {
          position: 'left'},
        title: {
          display: true,
          text: 'MemberShare Percentages'}
      }
    }
  });
}
//call the different functions for execution
updateAllSharePercentages().then(() => {
 renderMembers();
 renderSharePieChart();
});

})
