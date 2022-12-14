import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Input } from './Input';
import IngredientInput from './IngredientInput';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { addRecipe } from '../slicers/recipesSlicer';
import { ingredient, recipe } from '../types/recipe';
import { useRouter } from 'next/router';

export type Inputs = {
  ingredients: ingredient[];
  directions: string;
  title: string;
};

const NewRecipeForm = () => {
  const myRecipes = useSelector((state: RootState) => state.recipes.value);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const redirectUrlBase = '/recipes/detail/';
  const addIngredient = () => {
    const inputKey = ingredientsInputs.length;
    const newIngredients: JSX.Element[] = [
      ...ingredientsInputs,
      <IngredientInput
        addIngredient={addIngredient}
        key={inputKey}
        inputKey={inputKey}
        // errors={
        //   errors.ingredients && [
        //     errors.ingredients[0]?.name,
        //     errors.ingredients[0]?.quantity,
        //     errors.ingredients[0]?.unit
        //   ]
        // }
        register={register}
      />
    ];
    setIngredientsInputs(newIngredients);
  };

  const router = useRouter();
  const [ingredientsInputs, setIngredientsInputs] = useState<JSX.Element[]>([
    <IngredientInput
      addIngredient={addIngredient}
      key={0}
      inputKey={0}
      register={register}
    />
  ]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { ingredients, directions, title } = data;
    const id = uuidv4();
    const newRecipe: recipe = {
      id,
      title,
      ingredients,
      directions
    };
    dispatch(addRecipe(newRecipe));
    router.push(`${redirectUrlBase}${id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Title'
        error={errors.title}
        isRequired={true}
        name='title'
        register={register}
      />
      {ingredientsInputs}
      <Button label='Add ingredient' handleClick={() => addIngredient()} />
      <Input
        label='Directions'
        error={errors.directions}
        InputTag='textarea'
        isRequired={false}
        name='directions'
        register={register}
      />
      <Button label='Add' type='submit' />
    </form>
  );
};

export default NewRecipeForm;
