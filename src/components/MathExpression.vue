<template>
  <mn v-if="typeof props.expression === 'number'">{{ props.expression }}</mn>
  <template v-else-if="props.expression.operation === operations.Add">
    <mrow><MathExpression :expression="props.expression.left" /></mrow>
    <mo>+</mo>
    <mrow><MathExpression :expression="props.expression.right" /></mrow>
  </template>
  <template v-else-if="props.expression.operation === operations.Subtract">
    <mrow><MathExpression :expression="props.expression.left" /></mrow>
    <mo>-</mo>
    <mrow><MathExpression :expression="props.expression.right" /></mrow>
  </template>
  <template v-else-if="props.expression.operation === operations.Multiply">
    <mrow><MathExpression :expression="props.expression.left" /></mrow>
    <mo>&times;</mo>
    <mrow><MathExpression :expression="props.expression.right" /></mrow>
  </template>
  <mfrac v-else-if="props.expression.operation === operations.Divide">
    <mrow><MathExpression :expression="props.expression.left" /></mrow>
    <mrow><MathExpression :expression="props.expression.right" /></mrow>
  </mfrac>
  <msup v-else-if="props.expression.operation === operations.Exponent">
    <mrow><MathExpression :expression="props.expression.left" /></mrow>
    <mrow><MathExpression :expression="props.expression.right" /></mrow>
  </msup>
  <template v-else-if="props.expression.operation === operations.Log">
    <msub>
      <mi>log</mi>
      <mrow><MathExpression :expression="props.expression.left" /></mrow>
    </msub>
    <mo>(</mo>
    <mrow><MathExpression :expression="props.expression.right" /></mrow>
    <mo>)</mo>
  </template>
</template>

<script setup lang="ts">
import * as operations from "../operation";
import type { Expression } from "../solver";

const props = defineProps<{
  expression: Expression | number;
}>();
</script>
