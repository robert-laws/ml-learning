export type Concept = {
  id: number;
  title: string;
  simple: string;
  examples: string;
  takeaway: string;
};

export const CONCEPTS: Concept[] = [
  {
    id: 1,
    title: 'Supervised vs Unsupervised Learning',
    simple: 'Supervised learning uses labeled data to learn a mapping from inputs to outputs; unsupervised learning finds structure in unlabeled data like clusters or components.',
    examples:
      'In supervised learning, a spam classifier learns from thousands of emails already labeled spam/not-spam. In unsupervised learning, K-Means might group customers by spending patterns without knowing the group names ahead of time.',
    takeaway: 'Pick supervised when you have clear labels; explore unsupervised when you want patterns or groupings.',
  },
  {
    id: 2,
    title: 'Bias-Variance Tradeoff',
    simple: 'Models with low bias can capture complex patterns but may overfit (high variance); models with high bias are simpler but can underfit.',
    examples:
      'A deep tree may perfectly memorize a training set but fail on new data (high variance), while a shallow tree might miss important interactions (high bias). Cross-validation helps find the sweet spot.',
    takeaway: 'Balance model complexity with generalization, tuning depth or regularization to manage variance.',
  },
  {
    id: 3,
    title: 'Regularization',
    simple: 'Regularization adds a penalty to discourage overly complex models, keeping weights small and reducing overfitting.',
    examples:
      'L2 regularization in linear regression adds λ‖w‖² to the loss, shrinking weights; dropout randomly zeros activations during training to prevent co-adaptation.',
    takeaway: 'Use regularization techniques like weight decay, dropout, or early stopping to stabilize learning.',
  },
  {
    id: 4,
    title: 'Evaluation Metrics',
    simple: 'Use metrics aligned with your goal—accuracy for balanced classification, F1 for imbalanced labels, RMSE/MAE for regression.',
    examples:
      'For fraud detection, precision and recall matter more than raw accuracy. For recommendation ranking, metrics like NDCG capture ordering quality.',
    takeaway: 'Choose metrics that reward the behavior you care about; inspect multiple to avoid blind spots.',
  },
  {
    id: 5,
    title: 'Feature Engineering',
    simple: 'Transform raw data into informative features—scaling, encoding categories, or combining signals to help models learn.',
    examples:
      'Standardizing numeric columns can speed gradient descent. Target encoding can handle high-cardinality categories. Creating interaction terms lets linear models capture relationships.',
    takeaway: 'Invest time in clean, well-shaped features; even simple models can shine with thoughtful engineering.',
  },
  {
    id: 6,
    title: 'Model Validation',
    simple: 'Hold out data or use cross-validation to estimate how a model will perform on unseen data.',
    examples:
      'K-fold cross-validation averages performance across folds to reduce variance in the estimate. A temporal split keeps future data out of the training window for time-series.',
    takeaway: 'Always validate on data the model did not see during training to trust your performance numbers.',
  },
];

export const TOTAL_CONCEPTS = CONCEPTS.length;
