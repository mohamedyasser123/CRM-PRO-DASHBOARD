import React from 'react';
import { Chip } from '@mui/material';
import type { DealStage } from '../types/deal';

interface DealStageChipProps {
  stage: DealStage;
}

const stageStyleMap: Record<DealStage, { bg: string; color: string; border: string }> = {
  New: { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' }, // Blue
  Qualified: { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' },     // Purple
  Proposal: { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },  // Amber
  Won: { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' }, // Green
  Lost: { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },// Red
};

export const DealStageChip: React.FC<DealStageChipProps> = ({ stage }) => {
  const styles = stageStyleMap[stage] || { bg: '#f8fafc', color: '#475569', border: '#cbd5e1' };

  return (
    <Chip
      label={stage}
      size="small"
      variant="outlined"
      sx={{
        fontWeight: 600,
        backgroundColor: styles.bg,
        color: styles.color,
        borderColor: styles.border,
      }}
    />
  );
};