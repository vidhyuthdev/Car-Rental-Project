import api from '../api';

const useVerifyToken = () => {
    
    const verifyToken = async () => {
        let response, flag;
        const token = localStorage.getItem('token');
        if (!token) {
            flag = false;
            return { flag: flag, response: "Not Logged In" };
        }

        try {
            const res = await api.post('/verify-token', { token }); 
            response = res.data.msg; 
            flag = true;
        } catch (error) {
                      
            response = error.response?.data?.msg || "An error occurred";

            localStorage.removeItem('token');
            localStorage.removeItem("email");
            localStorage.removeItem('name');
            flag = false;
        }
        return { response, flag };
    };

    return { verifyToken };
};

export default useVerifyToken;
