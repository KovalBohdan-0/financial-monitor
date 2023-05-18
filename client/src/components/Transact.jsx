import TransactHOC from './TransactHOC';
function TransactDepo() {
  return <TransactHOC type='deposit' />;
}
function TransactCredit() {
  return <TransactHOC type='credit' />;
}
export { TransactDepo, TransactCredit };
