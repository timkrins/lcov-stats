export function covered() {
  // this is covered
  return 'hello covered';
}

export function uncovered() {
  // this is uncovered
  return 'hello uncovered';
}

export function uncoveredIfEnvSet() {
  // this is uncoveredIfEnvSet
  return 'hello uncoveredIfEnvSet';
}
