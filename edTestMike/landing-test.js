const usernameElTestMike = document.getElementById('username')
const titleElTestMike = document.getElementById('title')
const contentElTestMike = document.getElementById('content')
const errorElTestMike = document.getElementById('error')

const edTest = (description, testFunction) => {
  const result = testFunction();
  const passStyle = 'color: green; font-weight: bold;';
  const failStyle = 'color: red; font-weight: bold;';

  if (result.passed) {
    console.log(`%c✔️ ${description} - ${result.feedback}`, passStyle);
  } else {
    console.log(`%c❌ ${description} - ${result.feedback}`, failStyle);
    if (result.observed) {
      console.log(`Observed: ${result.observed}`);
    }
    if (result.expected) {
      console.log(`Expected: ${result.expected}`);
    }
  }
}

function clearForm(){
 
  if(usernameElTestMike){
    usernameElTestMike.value = ''
  }
  if(titleElTestMike){
    titleElTestMike.value = ''
  }
  if(contentElTestMike){
    contentElTestMike.value = ''
  }
  if(errorElTestMike){
    errorElTestMike.textContent = ''
  }
}

const initializeHTML = () => {
  const form = document.querySelector('form');
  const usernameLabel = document.querySelector('label[for="username"]');
  const usernameInput = document.querySelector('input[id="username"]');
  const titleLabel = document.querySelector('label[for="title"]');
  const titleInput = document.querySelector('input[id="title"]');
  const contentLabel = document.querySelector('label[for="content"]');
  const contentInput = document.querySelector('textarea[id="content"]');
  const error = document.querySelector('#error');

  return {
    form,
    usernameLabel,
    usernameInput,
    titleLabel,
    titleInput,
    contentLabel,
    contentInput,
    error,
  };
};

// Test that the form exists and is labeled correctly

edTest(
  'Should have a form with labels and inputs for username, blog title, and blog content',
  () => {
    const {
      form,
      usernameLabel,
      usernameInput,
      titleLabel,
      titleInput,
      contentLabel,
      contentInput,
    } = initializeHTML();

    if (
      form &&
      usernameLabel &&
      usernameInput &&
      titleLabel &&
      titleInput &&
      contentLabel &&
      contentInput
    ) {
      return {
        ok: true,
        passed: true,
        score: 5,
        feedback:
          'Great job! You have a form with labels and inputs for username, blog title, and blog content!',
        expand_feedback: true,
      };
    }

    if (
      form &&
      (!usernameLabel ||
        !usernameInput ||
        !titleLabel ||
        !titleInput ||
        !contentLabel ||
        !contentInput)
    ) {
      return {
        ok: true,
        passed: false,
        feedback:
          'The form does not have all of the required labels and inputs!',
        expand_feedback: true,
      };
    }

    return {
      ok: true,
      passed: false,
      feedback: 'You are missing the required form.',
      expand_feedback: true,
    };
  }
);

// Test that an error message is displayed when the form is submitted with empty fields

edTest(
  'Should display an error message when the form is submitted with empty fields',
  () => {
    const { form, usernameInput, titleInput, contentInput, error } =
      initializeHTML();

    if (!form || !usernameInput || !titleInput || !contentInput) {
      return {
        ok: true,
        passed: false,
        feedback:
          'The form does not have all of the required labels and inputs!',
        expand_feedback: true,
      };
    }
    usernameInput.value = 'test';
    titleInput.value = 'test';
    contentInput.value = '';

    form.dispatchEvent(new Event('submit'));
    if (
      (!usernameInput.value || !titleInput.value || !contentInput.value) &&
      error.textContent === 'Please complete the form.'
    ) {
    
      return {
        ok: true,
        passed: true,
        score: 10,
        feedback:
          'Great job! The form displays an error message when submitted with empty fields.',
        expand_feedback: true,
      };
    }
    return {
      ok: true,
      passed: false,
      feedback:
        'The form does not display an error message when submitted with empty fields.',
      expand_feedback: true,
    };
  }
);

// Test that the form data is stored in local storage when the form is submitted with valid data

edTest(
  'Should store form data in local storage when the form is submitted with valid data',
  () => {
    const { form, usernameInput, titleInput, contentInput } = initializeHTML();
    if (!form || !usernameInput || !titleInput || !contentInput) {
      return {
        ok: true,
        passed: false,
        feedback:
          'The form does not have all of the required labels and inputs!',
        expand_feedback: true,
      };
    }

    usernameInput.value = 'test';
    titleInput.value = 'test';
    contentInput.value = 'test';
    
    isTest = true
    form.dispatchEvent(new Event('submit'));
    isTest = false
    if(typeof readLocalStorage === 'undefined'){
      return {
        ok: true,
        passed: false,
        feedback:
          'no function called readLocalStorage has been defined',
        expand_feedback: false,
      };
    }

    storedData = readLocalStorage();
    
    

    if (storedData && storedData.length > 0) {
      //remoive all elements in the array that have username: 'test' and title: 'test' and content: 'test'
      storedData = storedData.filter((blog) => {
        if (blog.username === 'test' && blog.title === 'test' && blog.content === 'test') {
          return false; // This blog has all fields set to 'test' and will be filtered out
        }

        return true; // Keep this blog if any field is not 'test'
      });

      localStorage.setItem('blogs', JSON.stringify(storedData))
      return {
        ok: true,
        passed: true,
        score: 10,
        feedback:
          'Great job! The form data is stored in local storage when the form is submitted with valid data.',
        expand_feedback: true,
      };
    }


    return {
      ok: true,
      passed: false,
      feedback:
        'The form data is not stored in local storage when the form is submitted with valid data.',
      expected:
        'Stored data array: [{"username":"test","title":"test","content":"test"}]',
      observed: `Stored data array: ${storedData}`,
      expand_feedback: true,
    };
  }
);

// Test that the stored blog post objects include a username, title, and content.

edTest(
  'Should have blog post objects with a username, title, and content.',
  () => {
    const formData = {
      username: 'test',
      title: 'test',
      content: 'test',
    };
    if(typeof storeLocalStorage === 'undefined'){
      return {
        ok: true,
        passed: false,
        feedback:
          'no function called storeLocalStorage has been defined',
        expand_feedback: false,
      };
    }
    storeLocalStorage(formData);

    const posts = readLocalStorage();

    if (posts.every((post) => post.username && post.title && post.content)) {
      
      return {
        ok: true,
        passed: true,
        score: 5,
        feedback:
          'Great job! All blog post objects have a username, title, and content!',
        expand_feedback: true,
        observed: `posts: ${JSON.stringify(posts)}`,
      };
    }
    return {
      ok: true,
      passed: false,
      feedback:
        'Not all blog post objects have a username, title, and content!',
      expand_feedback: true,
      observed: `posts: ${JSON.stringify(posts)}`,
    };
  }
);

// Test that the page redirects to the blog page when the form is submitted with valid data.

edTest(
  'Should redirect to "blog.html" after a successful form submission',
  () => {
    const { form, usernameInput, titleInput, contentInput } = initializeHTML();
    if (!form || !usernameInput || !titleInput || !contentInput) {
      return {
        ok: true,
        passed: false,
        feedback:
          'The form does not have all of the required labels and inputs!',
        expand_feedback: true,
      };
    }

    usernameInput.value = 'test';
    titleInput.value = 'test';
    contentInput.value = 'test';

    isTest = true
    form.dispatchEvent(new Event('submit'));

    const redirected = redirectURL.includes('blog.html');
    isTest = false
    if (redirected) {
      
      return {
        ok: true,
        passed: true,
        score: 5,
        feedback:
          'Great job! The page redirects to "blog.html" after a successful form submission.',
        expand_feedback: true,
        observed: `redirectURL: ${redirectURL}`,
      };
    }

    return {
      ok: true,
      passed: false,
      feedback:
        'The page does not redirect to "blog.html" after a successful form submission. Be sure to use the redirectPage function defined in logic.js',
      expected: 'redirectURL should contain "blog.html"',
      observed: `redirectURL: ${redirectURL}`,
      expand_feedback: true,
    };
    
  }
  
);
const blogs = JSON.parse(localStorage.getItem('blogs'))
const filteredBlogs = blogs?.filter((blog) => {
  if (blog.username === 'test' && blog.title === 'test' && blog.content === 'test') {
    return false; // This blog has all fields set to 'test' and will be filtered out
  }
  return true; // Keep this blog if any field is not 'test'
});
if(!filteredBlogs || filteredBlogs.length === 0){
  localStorage.removeItem('blogs')
}else{
  localStorage.setItem('blogs', JSON.stringify(filteredBlogs))
}

clearForm()



