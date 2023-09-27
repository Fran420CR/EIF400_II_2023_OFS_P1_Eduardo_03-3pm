interface DialogProps {
    data: {
      teamMembers: string[];
      course: string;
      project: string;
      semester: string;
      year: string;
      school: string;
      university: string;
    };
    onClose: () => void;
  }
  