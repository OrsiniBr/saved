"use client";

import { useCallback, useMemo, useState } from "react";

type SelfIdProfile = {
  handle: string;
  reputationScore: number;
  attestations: number;
};

const SAMPLE_HANDLES = [
  "self:lyn-circle",
  "self:aja-guardian",
  "self:celo-builder",
  "self:trust-keeper",
];

const randomHandle = () => SAMPLE_HANDLES[Math.floor(Math.random() * SAMPLE_HANDLES.length)];

export function useSelfId() {
  const [profile, setProfile] = useState<SelfIdProfile | null>(null);
  const [isLinking, setIsLinking] = useState(false);

  const linkSelfId = useCallback(async () => {
    if (isLinking) return;
    setIsLinking(true);
    // Mock async Self Protocol linking flow
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setProfile({
      handle: randomHandle(),
      reputationScore: 80 + Math.floor(Math.random() * 20),
      attestations: 3 + Math.floor(Math.random() * 5),
    });
    setIsLinking(false);
  }, [isLinking]);

  const unlinkSelfId = useCallback(() => {
    setProfile(null);
  }, []);

  const status = useMemo(
    () => ({
      isLinked: Boolean(profile),
      handle: profile?.handle,
      reputationScore: profile?.reputationScore ?? 0,
      attestations: profile?.attestations ?? 0,
    }),
    [profile]
  );

  return {
    ...status,
    isLinking,
    linkSelfId,
    unlinkSelfId,
  };
}
