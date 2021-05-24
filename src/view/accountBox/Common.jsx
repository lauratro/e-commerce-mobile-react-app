import styled from "styled-components"

export const BoxContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
margin-top:10px;
`;
export const FormContainer = styled.form`
width:100%;
display:flex;
flex-direction:column;
`;

export const MutedLink = styled.a`
font-size:12px;
color: rgba(200,200,200, 0.8);
font-weight:500;
text-decoration:none;
`;

export const BoldLink = styled.a`
font-size:12px;
color: rgba(241,196, 15);
font-weight:500;
text-decoration:none;
`;

export const Input = styled.input`
width:100%;
height:42px;
outline:none;
border: 1px solid rgba(200,200,200, 0.0.3);
padding: 0px 10px;
border: 1.4px solid transparent;
margin-bottom: 6px;
transition: all 200ms ease-in-out;

&:placeholder{
    color: rgba(200,200,200, 1);
}

&:not(:last-of-type){
    border-bottom: 1.5px solid rgba(200,200,200, 0.4);
}


&:focus{
    outline:none;
    border-bottom: 2px solid rgb(241,196, 15);
}
`;
export const SubmitButton = styled.button`
width:100%;
padding: 11px 40%;
color:#fff;
font-size:15px;
font-weight:600;
border:none;
border-radius: 100px 100px 100px 100px;
cursor:pointer;
transition: all 240ms ease-in-out;
background: rgb(58,180,117);
background: linear-gradient(90deg, rgba(58,180,117,1) 0%, rgba(60,253,29,1) 38%, rgba(223,252,69,1) 100%);
margin-top: 10px;
&:hover {
    filter:brightness(1.03);
}
`;