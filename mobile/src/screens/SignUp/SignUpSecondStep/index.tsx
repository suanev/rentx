import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import BackButton from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import api from "../../../services/api";
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    CNH: string;
  };
}

const SignUpSecondStep = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route?.params as Params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e sua confirmação.");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("As senhas não conferem.");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.CNH,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          title: "Conta criada!",
          message: "Agora é só fazer login \ne aproveitar.",
          goToScreen: "SignIn",
        });
      })
      .catch((e) => {
        Alert.alert("Não foi possivel cadastrar", e);
      });
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active={true} />
            </Steps>
          </Header>

          <Title>
            Crie sua{"\n"}
            conta
          </Title>

          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <Input
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              placeholder="Senha"
            />

            <Input
              secureTextEntry={true}
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              iconName="lock"
              placeholder="Repetir Senha"
            />
          </Form>
          <Button
            title="Cadastrar"
            onPress={handleRegister}
            enabled={true}
            loading={false}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpSecondStep;
