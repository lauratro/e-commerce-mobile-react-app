import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./AccountContext";
import { SignUpForm } from "./SignUpForm";

const BoxContainer = styled.div`
  width: 280px;
  @media (min-width: 630px) {
    width: 95%;
  }
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;

  overflow: hidden;
`;
const ExternContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TopContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;
const BackDrop = styled(motion.div)`
width:160%;
height:550px;
position:absolute;
display:flex;
transform:rotate(60deg)
top:-280px;
left:-70px;
flex-direction:column;
border-radius:50%;
background: rgb(58,180,117);
background: linear-gradient(90deg, rgba(58,180,117,1) 0%, rgba(39,161,45,1) 38%, rgba(25,78,34,1) 100%);
z-index:5;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  left: 5px;
`;
const HeaderText = styled.h2`
  @media (min-width: 600px) {
    text-align: center;
  }
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;
const SmallText = styled.div`
  @media (min-width: 600px) {
    text-align: center;
  }
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  z-index: 10;
  margin: 0;
  margin-top: 8px;
`;
const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1200px",
    top: "-390px",
    borderRadius: "20%",
    transform: "rotate(40deg)",
  },
  collapsed: {
    width: "160%",
    heigth: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};
const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 40,
};
export function AccountBox(props) {
  //Animation Login/Signup Form
  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setIsExpanded(true);
    setTimeout(
      () => setIsExpanded(false),
      expandingTransition.duration * 1000 - 1500
    );
  };
  const switchToSignUp = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };
  const switchToSignIn = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };
  const contextValue = { switchToSignUp, switchToSignIn };
  //End Animation Login/SignUp Form

  return (
    <AccountContext.Provider value={contextValue}>
      <ExternContainer>
        <BoxContainer>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {active === "signin" && (
              <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please Sign in to continue!</SmallText>
              </HeaderContainer>
            )}
            {active === "signup" && (
              <HeaderContainer>
                <HeaderText>Create</HeaderText>
                <HeaderText>Account</HeaderText>
                <SmallText>Please Sign up to continue!</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "signin" && <LoginForm />}
            {active === "signup" && <SignUpForm />}
          </InnerContainer>
        </BoxContainer>
      </ExternContainer>
    </AccountContext.Provider>
  );
}
