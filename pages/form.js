import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import styles from "./Form.module.css";

const BMIVerdict = (bmi) => {
  if (bmi < 16.5) return "Starvation";
  if (bmi >= 16.5 && bmi < 18.5) return "Thin";
  if (bmi >= 18.5 && bmi < 25) return "Normal weight";
  if (bmi >= 25 && bmi < 30) return "Overweight";
  if (bmi >= 30 && bmi < 35) return "Moderate obesity";
  if (bmi >= 35 && bmi < 40) return "Severe obesity";
  return "Morbid or massive obesity";
};

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [isForm, setIsForm] = useState(true);
  const [bmi, setBMI] = useState(0);

  const openVerdict = () => setIsForm(false);
  const restart = () => {
    setIsForm(true);
    setBMI(0);
  };

  const onSubmit = (data) => {
    setLoading(true);
    fetch("api/submit_data", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBMI(res.bmi);
      })
      .finally(() => {
        setLoading(false);
        reset();
        openVerdict();
      });
  };

  return isForm ? (
    <Layout
      title="Form"
      subtitle="Complete the form to calculate your Body Mass Index."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3}>
          <FormControl isInvalid={errors.name}>
            <Input
              type="text"
              placeholder="Your name"
              autoComplete="off"
              {...register("name", { required: true, maxLength: 30 })}
            />
            <FormErrorMessage>Name is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.size}>
            <Input
              type="number"
              placeholder="Your size (cm)"
              {...register("size", {
                required: true,
                minLength: 2,
                maxLength: 3,
              })}
            />
            <FormErrorMessage>Size is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.weight}>
            <Input
              type="number"
              placeholder="Your weight (kg)"
              {...register("weight", { required: true, maxLength: 3 })}
            />
            <FormErrorMessage>Weight is required.</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.birthDate}>
            <FormLabel htmlFor="birthDate">Date of birth</FormLabel>
            <Input
              id="birthDate"
              type="date"
              {...register("birthDate", { required: true })}
            />
            <FormErrorMessage>Date of birth is required.</FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isLoading}>
            Calculate now!
          </Button>
        </VStack>
      </form>
    </Layout>
  ) : (
    <Layout title="The verdict" subtitle="Your Body Mass Index results.">
      <VStack>
        <div className={styles.verdict}>
          <div>
            <span className={styles.figures}>{bmi}</span>{" "}
            <span className={styles.units}>kg/m2</span>
          </div>
          <div className={styles.comment}>{BMIVerdict(bmi)}</div>
        </div>
        <Stack direction="row" spacing={3}>
          <Button variant="solid" size="lg" onClick={restart}>
            Restart
          </Button>
          <Link href="/history" passHref>
            <Button variant="outline" size="lg">
              View history
            </Button>
          </Link>
        </Stack>
      </VStack>
    </Layout>
  );
}
