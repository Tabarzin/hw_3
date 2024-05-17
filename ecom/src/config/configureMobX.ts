import { configure } from 'mobx';

configure({
  useProxies: 'never',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});
