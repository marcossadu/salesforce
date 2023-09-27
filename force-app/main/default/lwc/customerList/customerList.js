// import { LightningElement, wire } from 'lwc';
// // import insertCustomer from '@salesforce/apex/CustomerController.insertCustomer';
// // import getCustomers from '@salesforce/apex/CustomerController.getCustomers';
// import getAllCustomers from '@salesforce/apex/CustomerController.getAllCustomers';



// export default class CustomerList extends LightningElement {
//     name = '';
//     surname = '';
//     phone = '';
//     email = '';
//     showPhoneError = false;
//     showEmailError = false;
//     isAddButtonDisabled = true;
//     customers = [];
//     error= null
    
//     connectedCallback() {
// 		this.loadCustomers();
// 	}
// 	loadCustomers() {
// 		getAllCustomers()
// 			.then(result => {
// 				this.customers = result;
//                 console.log("customer", this.customers)
// 			})
// 			.catch(error => {
// 				this.error = error;
// 			});
// 	}

//     handleNameChange(event) {
//         this.name = event.target.value;
//         this.validateAddButton();
//     }

//     handleSurnameChange(event) {
//         this.surname = event.target.value;
//         this.validateAddButton();
//     }

//     handlePhoneChange(event) {
//         this.phone = event.target.value;
//         this.validateAddButton();
//         this.showPhoneError = !event.target.checkValidity();
//     }

//     isEmailValid(email) {
//         return email.includes('@');
//     }

//     handleEmailChange(event) {
//         this.email = event.target.value;
//         this.validateAddButton();
//         this.showEmailError = !event.target.checkValidity();
//     }

//     validateAddButton() {
//         const isNameValid = this.name.trim() !== '';
//         const isSurnameValid = this.surname.trim() !== '';
//         const isPhoneValid = this.phone;
//         const isEmailValid = this.email;

//         this.isAddButtonDisabled = !(isNameValid && isSurnameValid && isPhoneValid && isEmailValid);
//     }

//     async handleAddRecord() {
//         if (this.isAddButtonDisabled) {
//             return;
//         }

//         try {
//             await insertCustomer({ name: this.name, surname: this.surname, phone: this.phone, email: this.email });
//             this.customers = await getAllCustomers();

//             this.name = '';
//             this.surname = '';
//             this.phone = '';
//             this.email = '';
//             this.showPhoneError = false;
//             this.showEmailError = false;

//             this.isAddButtonDisabled = true;
//         } catch (error) {
//             // Maneja errores
//         }
//     }
// }
import { LightningElement } from 'lwc';
import getAllCustomers from '@salesforce/apex/CustomerController.getAllCustomers';
export default class CustomerList extends LightningElement {
    name = '';
    surname = '';
    phone = '';
    email = '';
    showPhoneError = false;
    showEmailError = false;
    isAddButtonDisabled = true;
    customers = []; // Agregar esta línea para inicializar la matriz de registros
    

    connectedCallback() {
        		this.loadCustomers();
        	}
        	loadCustomers() {
        		getAllCustomers()
        			.then(result => {
        				this.customers = result;
                        console.log("customer", this.customers)
        			})
        			.catch(error => {
        				this.error = error;
        			});
        	}

    handleNameChange(event) {
        this.name = event.target.value;
        this.validateAddButton();
    }

    handleSurnameChange(event) {
        this.surname = event.target.value;
        this.validateAddButton();
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
        this.validateAddButton();
        this.showPhoneError = !event.target.checkValidity();
        
    }
    isEmailValid(email) {
        return email.includes('@');
    }

    handleEmailChange(event) {
        this.email = event.target.value;
        this.validateAddButton();
        this.showEmailError = !event.target.checkValidity();

       
    }

    validateAddButton() {
        // Este campo verificara si todos los campos están completos y no hay errores en la validación
        const isNameValid = this.name.trim() !== '';
        const isSurnameValid = this.surname.trim() !== '';
        const isPhoneValid = this.phone;
        const isEmailValid = this.email;

        // Habilitará el botón solo si todos los campos están completos
        this.isAddButtonDisabled = !(isNameValid && isSurnameValid && isPhoneValid && isEmailValid);
    }

    handleAddRecord() {
        // Evitar agregar un registro si el botón está deshabilitado
        if (this.isAddButtonDisabled) {
            return;
        }

        const customer = {
            Name__c: this.name,
            Surname__c: this.surname,
            Phone__c: this.phone,
            Email__c: this.email
        };

        this.customers = [...this.customers, customer];

        this.name = '';
        this.surname = '';
        this.phone = '';
        this.email = '';
        this.showPhoneError = false;
        this.showEmailError = false;

        this.isAddButtonDisabled = true;
    }
}