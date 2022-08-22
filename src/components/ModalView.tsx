import { Button, IconAlertCircle, Modal } from "@supabase/ui";
import { useState } from "react";

export default function ModalBasic({ visible, onCancel, onConfirm }: any) {
  return (
    <>
      <Modal
        size="small"
        layout="vertical"
        title="Modal with vertical layout"
        description="Description of modal"
        visible={visible}
        onCancel={onCancel}
        onConfirm={onConfirm}
        icon={<IconAlertCircle background="brand" size="xlarge" />}
      />
    </>
  );
}
