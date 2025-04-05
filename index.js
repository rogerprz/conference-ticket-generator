document.addEventListener('DOMContentLoaded', function () {
  const genButton = document.getElementById('generate-ticket-button');
  const uploadAvatar = document.getElementById('upload-avatar');
  let avatarImage = null;

  genButton.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('full-name');
    const username = document.getElementById('github-username');
    const email = document.getElementById('email');
    const avatar = document.getElementById('upload-avatar');
    const nameValue = name.value;
    const usernameValue = username.value;
    const emailValue = email.value;
    console.log(nameValue);
    console.log(usernameValue);
    console.log(avatar);

    const header = document.getElementById('h1-header');
    const subHeader = document.getElementById('h4-sub-header');
    const ticket = document.getElementById('ticket-container');
    header.innerHTML = congratsMessage(nameValue);
    subHeader.innerHTML = emailSentMessage(emailValue);
    console.log('Avatar:', avatarImage);
    avatarImage.style.width = '70px';
    avatarImage.style.height = '70px';

    ticket.innerHTML = `
      <div class="ticket-header">
        <img style="width: 200px; height: 50px;" src="./assets/images/logo-full.svg" alt="Coding conf logo" />
        <div class="ticket-info">${getDate()} / Seattle, WA</div>
      </div>
      <div style="display: flex; column-gap: 20px;">
        ${avatarImage.outerHTML}
        <div>
          <div class="ticket-info">${nameValue}</div>
          <div class="ticket-info">${usernameValue}</div>
        </div>
      </div>
      `;

    const formSection = document.getElementById('ticket-form');
    formSection.style.display = 'none';
    ticket.style.display = 'flex';
    ticket.classList.add('ticket-container');
  });

  uploadAvatar.addEventListener('change', function (event) {
    const file = event.target.files[0];
    console.log('File:', file);
    const fileSize = file.size ? Math.round(file.size / 1024) : 0;
    if (fileSize > 500) {
      const uploadYourPhoto = document.getElementById('upload-your-photo');

      uploadYourPhoto.innerHTML = `
         <img id="icon-error" src="./assets/images/icon-info.svg" alt="error">
        <span style="color: red;">File too large. Please upload a file under 500KB.</span`;
      return;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      const uploadYourPhoto = document.getElementById('upload-your-photo');
      uploadYourPhoto.innerHTML = `
        <img id="icon-error" src="./assets/images/icon-info.svg" alt="error">
        <span style="color: red;">File type not supported. Please upload a PNG or JPEG file.</span>`;
      return;
    }

    const reader = new FileReader();
    console.log('File:', file);
    console.log('Reader:', reader);
    reader.onload = function (e) {
      const div = document.createElement('div');
      div.classList.add('avatar');
      div.id = 'avatar-container';

      avatarImage = document.createElement('img');
      avatarImage.src = e.target.result;
      avatarImage.id = 'avatar-image';
      avatarImage.style.width = '100px';
      avatarImage.style.height = '100px';
      div.classList.add('avatar');
      div.appendChild(avatarImage);
      div.appendChild(uploadChangeAvatarContainer());
      uploadAvatar.parentNode.replaceWith(div);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  const uploadChangeAvatarContainer = () => {
    const divContainer = document.createElement('div');
    divContainer.classList.add('avatar-buttons-container');

    const removeImage = document.createElement('button');
    removeImage.innerText = 'Remove Image';

    const changeImage = document.createElement('button');
    changeImage.innerText = 'Change Image';

    divContainer.appendChild(removeImage);
    divContainer.appendChild(changeImage);
    divContainer.classList.add('avatar-buttons');

    removeImage.addEventListener('click', function () {
      // TODO: Remove image needs to revert to old render
      // We need to capture old render and allow new image to be uploaded
      const newAvatar = document.getElementById('avatar-container');
      console.log('Upload Avatar:', newAvatar);
      const label = document.createElement('label');

      label.setAttribute('for', 'upload-avatar');
      label.classList.add('avatar');
      label.accept = 'image/png, image/jpeg';
      label.ariaLabel = 'Upload your avatar';
      label.innerHTML = `
        <input type="file" id="upload-avatar" accept="image/png, image/jpeg" hidden required>
        <div class="upload-box">
          <img src="./assets/images/icon-upload.svg" alt="Upload Avatar image">
          <div class="sub-text upload-text">Drag and drop or click to upload</div>
        </div>
        `;
      newAvatar.replaceWith(label);
      uploadAvatar = label;
    });

    changeImage.addEventListener('click', function () {
      const avatar = document.getElementById('avatar-image');
      const uploadAvatar = document.createElement('input');
      uploadAvatar.type = 'file';
      uploadAvatar.id = 'upload-avatar';
      uploadAvatar.accept = 'image/*';
      avatar.parentNode.replaceWith(uploadAvatar);
      divContainer.remove();
    });

    return divContainer;
  };
});

const avatarImage = (src) => {
  const avatarImage = document.createElement('img');
  avatarImage.src = src;
  avatarImage.id = 'avatar-image';
  avatarImage.style.width = '100px';
  avatarImage.style.height = '100px';
  return avatarImage;
};

const congratsMessage = (name) => {
  return `<div>Congrats, <span style="background: linear-gradient(to right, rgb(214, 114, 97), white); -webkit-background-clip: text; color: transparent;">${name}</span>!</div>
  <div> Your ticket is ready.</div>`;
};

const emailSentMessage = (email) => {
  return `<div>We've emailed your ticket to <span style="background: linear-gradient(to right, rgb(214, 114, 97), white); -webkit-background-clip: text; color: transparent;">${email}</span> and will send updates in the run up to the event.</div>`;
};

const getDate = () => {
  const dateOneMonthFromNow = new Date();
  dateOneMonthFromNow.setMonth(dateOneMonthFromNow.getMonth() + 1);

  const options = {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  };
  return dateOneMonthFromNow.toLocaleDateString('en-US', options);
};
