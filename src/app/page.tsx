"use client";
import { useEffect, useState } from "react";

type Data = {
  id: number;
  name: string;
};

export default function Home() {
  const [data] = useState<Data[]>([
    { id: 1, name: "Hello" },
    { id: 2, name: "Bye" },
  ]);
  const [selectedData, setSelectedData] = useState<number[]>([]);
  const [submittingData, setSubmittingData] = useState<number[]>([]);
  const [submittedData, setSubmittedData] = useState<number[]>([]);

  const onCheck = (id: number) => {
    setSelectedData((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const onBatchSave = () => {
    setSubmittingData(selectedData);
    setSelectedData([]);
  };

  const onSubmit = (id: number) => {
    setSubmittingData((prev) => prev.filter((itemId) => itemId !== id));
    setSubmittedData((prev) => [...prev, id]);
  };

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col gap-2">
      <ul className="gap-2 flex flex-col">
        {data.map((row) => (
          <ListItem
            key={row.id}
            data={row}
            checked={selectedData.includes(row.id)}
            isSubmitting={submittingData.includes(row.id)}
            isSubmitted={submittedData.includes(row.id)}
            onCheck={onCheck}
            onSubmit={onSubmit}
          />
        ))}
      </ul>
      <button className="btn" onClick={onBatchSave}>
        batch save
      </button>
    </div>
  );
}

const ListItem = ({
  data,
  checked,
  onCheck,
  isSubmitting,
  isSubmitted,
  onSubmit,
}: {
  data: Data;
  checked: boolean;
  onCheck: (id: number) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onSubmit: (id: number) => void;
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSubmit(data.id);
      }, 1000);
    }
  }, [isSubmitting, data.id, onSubmit]);

  return (
    <li>
      <label className="flex gap-4 items-center">
        <input
          type="checkbox"
          checked={checked || isSubmitted}
          disabled={isSubmitted}
          className="checkbox"
          onChange={() => onCheck(data.id)}
        />
        {data.name}
        <button
          className="btn"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              onSubmit(data.id);
            }, 1000);
          }}
          disabled={isSubmitted}
        >
          {loading ? <span className="loading loading-ring loading-xs"></span> : isSubmitted ? "done" : "go"}
        </button>
      </label>
    </li>
  );
};
