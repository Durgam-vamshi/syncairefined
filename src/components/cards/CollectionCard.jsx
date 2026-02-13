import { getAccentVars } from "../../utils/accent.js";

export function CollectionCard({ collection }) {
  return (
    <div className="collection-card" style={getAccentVars(collection.color)}>
      <div className="collection-card-stripe" />
      <div className="collection-card-body">
        <div className="collection-card-name">{collection.name}</div>
        <div className="collection-card-desc">{collection.description}</div>
        <div className="collection-card-meta">
          <span>{collection.count} agents</span>
          <span className="collection-card-curator">by {collection.curator}</span>
        </div>
      </div>
    </div>
  );
}
