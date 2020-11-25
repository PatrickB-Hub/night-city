interface Props {
  setShowMirrorShards: () => void;
}

const ToggleShardsButton: React.FC<Props> = ({ setShowMirrorShards }) => {
  return (
    <button
      onClick={setShowMirrorShards}
      className="btn"
    >
    </button>
  );
};

export default ToggleShardsButton;
