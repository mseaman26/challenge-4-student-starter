//do not change the following line
let isTest = false

//your coding begins here

// TODO: Create logic to toggle the light/dark mode styles for the page and circle. The mode should be saved to local storage.


// TODO: Create a function called `readLocalStorage` that reads from local storage and returns the data. If no data exists, return an empty array. It does not need to take any arguments, It just needs to return the blogs stored in local storage as an array


// TODO: Create a function called `storeLocalStorage` that takes a given object and saves the new data to the existing blog data in local storage. Please use the key 'blogs' for storing blog data in local storage, otherwise the local tests will not work properly

// !!!!! Use the following redirectPage function whenever you need to redirect to a different page.  Do not modify any of the code below
let redirectURL = '';

const redirectPage = function (url) {
  redirectURL = url
  if (!isTest) {
    // Only redirect if the event is user-initiated
    redirectURL = url
    location.assign(redirectURL)

  }else{
    redirectURL = url
  }
};



