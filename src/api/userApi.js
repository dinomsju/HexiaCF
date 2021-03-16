import {BASE_URL} from "./BASE_URL";
import axios from 'axios';
const SignUp = async (phone,name,address) => {
    try {
        
        let SignUp = await axios.post(`${BASE_URL}/api/loginUser`,{
            phone,
            name,
            address,
        },{
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        
        return SignUp;
    } catch (error) {
        console.log(error);
        return 'error'
    }
    
}

export default SignUp;