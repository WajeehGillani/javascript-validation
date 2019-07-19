class User{
	constructor(firstName, email, password, confirmPassword, file){
		this.firstName = firstName;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.file = file;
	}
	//check if input fields are Empty
	isEmpty(input,name) {
		if(input === ''){
			Validation.ShowAlert('Field Can not be Empty', 'danger',name);
		}
		else{
			return false;
		}
	}
	//check Name Only Alphabets and Empty Input
	checkName(input,name) {
		const reg = /^[a-zA-Z]+$/;
		this.checkLength(input,3,10);
		if(input === ''){
			Validation.ShowAlert('Field Can not be Empty', 'danger',name);
		}
		
		else if(!reg.test(input)){
			Validation.ShowAlert('Name is Not Valid (Alphabets only)', 'danger');
		}
		else{
			return false;
		}
	}
	checkLength(input, min, max){
		if(input.length < min || input.length > max){
			Validation.ShowAlert('Name can not be greater than 10 or less than 3 Char', 'danger');
		}
		else{
			return false;
		}
	}
	fileValidation(input){
		const filePath = input;
		const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		this.isEmpty(input,'file');
		if(!allowedExtensions.test(filePath)){
			Validation.ShowAlert('Please Upload JPG, PNG & GIF only', 'danger');
			return false;
		}
	}
	checkConfirmPassword(input,input1){
		if(input != input1){
			Validation.ShowAlert('Password Doesnt match', 'danger');
		}
		else{
			return false
		}
	}
	checkEmail(input){
		const check_email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
		this.isEmpty(input,'Email');
		if(!check_email.test(input)){
			
			Validation.ShowAlert("Not Valid Email",'danger');
		}
		else{
			return true
		}
		
	}
	checkPasswordStrength(input){
		const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
		
		if(!strongRegex.test(input)){
			Validation.ShowAlert('Password is Weak Use one Capital Letter; Use one Special Char and Number','danger');
		}
		else{
			return true;
		}
	}
	
	 promptPromise(message) {
		return new Promise(function(resolve, reject) {	
			document.querySelector('.row').style.display = 'none';
		const result = alert(`Thank you! ${message} for Your Waiting`);
		  if (result != null) {
			resolve(result);
		  } else {
			reject(new Error('Something went Wrong'));
		  }
		});
	  }
}
class Validation{

	static ShowAlert(message, className,inputName ='') {
		const div = document.createElement('div');
		div.className =`alert alert-${className}`;
		div.appendChild(document.createTextNode(`${inputName} ${message}`));
		const container = document.querySelector('.container');
		const row = document.querySelector('.row');
		container.insertBefore(div, row);
		setTimeout(()=>document.querySelector('.alert').remove(), 5000);
	
	}
	

}

document.addEventListener('DOMContentLoaded', Validation.displayAll);

document.querySelector('#user-form').addEventListener('submit', (e)=>{
	e.preventDefault();
	const data={
		firstName : document.querySelector('#first_name').value,
		email : document.querySelector('#email').value,
		password : document.querySelector('#password').value,
		confirmPassword : document.querySelector('#confirm_password').value,
		file : document.querySelector('#customFile').value
	}
	const { firstName, email, password, confirmPassword, file} = data;
	const user = new User(firstName, email, password, confirmPassword, file);

	user.checkName(firstName,'Name');
	user.checkEmail(email);
	user.checkPasswordStrength(password);
	user.checkConfirmPassword(password,confirmPassword);
	user.fileValidation(file);

   
	

	
});
