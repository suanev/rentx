import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import * as Yup from "yup";

import BackButton from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from "./styles";

const SignUpFirstStep = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [CNH, setCNH] = useState("");

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        CNH: Yup.string().required("Número de CNH obrigatória").length(9),
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
      });

      const data = { name, email, CNH };

      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert("Erro na autenticação", "Verifique suas as credencias");
      }
    }
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
            <FormTitle>1. Dados</FormTitle>

            <Input
              key="name"
              autoCorrect={false}
              value={name}
              onChangeText={setName}
              iconName="user"
              placeholder="Nome"
              autoCapitalize="words"
            />

            <Input
              key="email"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              autoCorrect={false}
              value={CNH}
              onChangeText={setCNH}
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>

          <Button
            title="Próximo"
            onPress={handleNextStep}
            enabled={true}
            loading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpFirstStep;
